import {measureSpeed} from "../function/measureSpeed";

export const MeasureSpeed = (target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

    descriptor.value = measureSpeed(target.constructor.name + '.' + methodName, target[methodName]);
};