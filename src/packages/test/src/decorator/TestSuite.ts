import {ITestRegistration, TEST_CONFIGS} from "./Test";

export const RETURNS_ASSERT_VALUE = 'ASSERT_VALUE';

export interface ITestClass<TC> extends Function {
    new(...args: any[]): TC;
}

export function TestSuite(target: ITestClass<any>): any {

    const testsToRun: Array<ITestRegistration> = Reflect.get(target, TEST_CONFIGS);

    const testInstance = new target();

    testsToRun.forEach((testRegistration: ITestRegistration) => {

        Reflect.set(target.prototype[testRegistration.methodName], RETURNS_ASSERT_VALUE, testRegistration.testConfig.returns);

        // call method
        testInstance[testRegistration.methodName](...testRegistration.testConfig.params || []);
    });

    return target;
}