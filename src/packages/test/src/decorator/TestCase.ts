import "mocha";
import {TestCaseExpectation} from "../interface/TestCaseExpectation";

export const TEST_CONFIGS = 'TEST_CONFIGS';

export interface ITestRegistration {
    methodName: string;
    testConfig: TestCaseExpectation;
}

export const TestCase = (testConfig: TestCaseExpectation) =>
    (prototype: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

    let _methodName = methodName;

    if (typeof testConfig.method !== 'undefined') {

        if (typeof testConfig.method === 'function') {
            _methodName = testConfig.method.name;
        } else if (typeof testConfig.method === 'string') {
            _methodName = testConfig.method;
        } else {
            throw new Error(`@TestCase ${testConfig}: method must be a name (string) or function reference.`);
        }
    }

    const existingTestConfigs = Reflect.get(prototype.constructor, TEST_CONFIGS) || [];

    Reflect.set(prototype.constructor, TEST_CONFIGS, [...existingTestConfigs, {
        methodName: _methodName,
        testConfig
    }]);
};