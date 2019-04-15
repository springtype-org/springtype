import {TestCase, TestSuite} from "../../../../test";
import {buffer} from "../../../src/lang";

@TestSuite
export class BufferTest {

    @TestCase({
        name: 'Should call arrow function only one time when called 10 times in 100ms',
        params: [100, 10, 10],
        returns: 1
    })
    @TestCase({
        name: 'Should call arrow function two times when called 7 times in 70ms',
        params: [50, 10, 7],
        returns: 2
    })
    testBufferedFunction(bufferTime: number, callIntervalTime: number, callTimes: number): Promise<number> {

        return new Promise<number>((done) => {

            let callCount = 0;
            let internalCallCount = 0;

            const originalFn = () => {
                internalCallCount++;
            };

            const bufferedFn = buffer(originalFn, bufferTime);

            const interval = setInterval(() => {

                callCount++;

                bufferedFn();

                if (callCount >= callTimes - 1) {
                    done(internalCallCount);
                    clearInterval(interval);
                }

            }, callIntervalTime);
        });
    }
}