import {ApplicationContext} from "../../../di";
import {buffer} from "./buffer";

interface FunctionCallTimeStack {
    [functionName: string]: Array<number>;
}

interface FunctionCallTimeAvgResult {
    [functionName: string]: number;
}

interface FunctionCallAmount {
    [functionName: string]: number;
}

export const measureSpeed = (name: string, fn: Function) => {

    const aggregateTimings = buffer(() => {

        const callTimings: FunctionCallTimeStack =
            ApplicationContext.getGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP') || {};

        const callAvg: FunctionCallTimeAvgResult =
            ApplicationContext.getGlobal('MEASURE_PERFORMANCE_CALL_TIME_AVERAGE') || {};

        const callAmount: FunctionCallAmount =
            ApplicationContext.getGlobal('MEASURE_PERFORMANCE_CALL_AMOUNT') || {};

        if (!callAmount[name]) {
            callAmount[name] = 0;
        }

        callAmount[name] += callTimings[name].length;

        if (callAvg[name]) {
            callTimings[name].push(callAvg[name]);
        }

        callAvg[name] = callTimings[name].reduce(
            (previousTiming: number, currentTiming: number) => previousTiming + currentTiming)
                / (callTimings[name].length);

        // reset timing stack
        callTimings[name] = [];

        ApplicationContext.setGlobal('MEASURE_PERFORMANCE_CALL_TIME_AVERAGE', callAvg);
        ApplicationContext.setGlobal('MEASURE_PERFORMANCE_CALL_AMOUNT', callAmount);

        ApplicationContext.setGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP', callTimings);

    }, 100);

    return function(...args: any) {

        const callTimings: FunctionCallTimeStack =
            ApplicationContext.getGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP') || {};

        if (!callTimings[name]) {
            callTimings[name] = [];
        }

        const start = performance.now();
        const returnValue = fn(...args);
        const end = performance.now();

        callTimings[name].push(end - start);

        ApplicationContext.setGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP', callTimings);

        aggregateTimings();

        return returnValue;
    };
};