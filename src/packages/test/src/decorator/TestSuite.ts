import "mocha";
import {registerJSDOM} from "@springtype/springtype-incubator-ssr";

// register JSDOM with web component support
registerJSDOM();

import {ITestRegistration, TEST_CONFIGS} from "./TestCase";
import {ComponentReflector, Component} from "@springtype/springtype-incubator-core";
import {expect} from "chai";

export interface ITestClass<TC> extends Function {
    new(...args: any[]): TC;
}

export function TestSuite(target: ITestClass<any>): any {

    target = Component(target);

    const testsToRun: Array<ITestRegistration> = Reflect.get(target, TEST_CONFIGS) || [];
    const testInstance = new target();

    const run = (testRegistration: ITestRegistration): Promise<any> => {

        return new Promise<any>((testExecuted) => {

            let testCaseName = testRegistration.testConfig.name;
            let printedArguments = '()';

            if (testRegistration.testConfig.params &&
                testRegistration.testConfig.params.length) {
                printedArguments = `(${testRegistration.testConfig.params.join(', ')}) `;
            }

            if (!testCaseName) {

                if (typeof testRegistration.testConfig.throws !== 'undefined') {

                    // error message
                    if (typeof testRegistration.testConfig.throws === 'string') {
                        testCaseName = `${testRegistration.methodName}${printedArguments} should throw error with message: '${testRegistration.testConfig.throws}'.`;
                    } else {
                        testCaseName = `${testRegistration.methodName}${printedArguments} should throw error of type: '${testRegistration.testConfig.throws.name}'.`;
                    }

                } else if (typeof testRegistration.testConfig.test === 'function') {

                    testCaseName = `${testRegistration.methodName}${printedArguments} fulfills condition of dynamic test function.`;

                } else {
                    testCaseName = `${testRegistration.methodName}${printedArguments} should return value: ${testRegistration.testConfig.returns}.`;
                }
            }

            if (testRegistration.testConfig.returnsWithin) {
                testCaseName += ` [t. max: ${testRegistration.testConfig.returnsWithin} ms]`;
            }

            it (testCaseName, (done) => {

                _execute(testRegistration.methodName, testRegistration.testConfig.params || [], (result: any) => {

                    try {
                        if (typeof testRegistration.testConfig.returns !== 'undefined') {
                            expect(result.returnValue).equal(testRegistration.testConfig.returns);
                        }

                        if (typeof testRegistration.testConfig.test === 'function') {
                            expect(testRegistration.testConfig.test(
                                result.returnValue, testRegistration.testConfig.params || [])
                            ).equal(true);
                        }

                        if (typeof testRegistration.testConfig.throws !== 'undefined') {

                            if (typeof testRegistration.testConfig.throws === 'string') {

                                // check on message
                                expect(result.errorThrown.message).equal(testRegistration.testConfig.throws);

                            } else {

                                // check on prototype
                                expect(result.errorThrown).instanceOf(testRegistration.testConfig.throws);
                            }
                        }

                        if (testRegistration.testConfig.returnsWithin) {

                            expect(result.time).lte(
                                testRegistration.testConfig.returnsWithin as number,
                                `Method exceeded execution time constraint of ${testRegistration.testConfig.returnsWithin} ms.`
                            );
                        }

                        done();
                        testExecuted();

                    } catch(e) {

                        done(e);
                        testExecuted();
                    }
                });
            });
        });
    };

    const _execute = async(methodName: string, params: Array<any>, done: Function) => {

        let returnValue: any;
        let errorThrown: any = undefined;

        const timeBeforeExecution = Date.now();
        let timeAfterExecution = Date.now();

        try {
            // call original impl. method
            returnValue = testInstance[methodName].apply(testInstance, params);
            timeAfterExecution = Date.now();
        } catch (e) {
            errorThrown = e;
        }

        if (returnValue instanceof Promise) {

            returnValue = await returnValue;
            timeAfterExecution = Date.now();

            done({
                time: timeAfterExecution - timeBeforeExecution,
                returnValue,
                errorThrown
            });

        } else {

            done({
                time: timeAfterExecution - timeBeforeExecution,
                returnValue,
                errorThrown
            });
        }
    };

    describe(ComponentReflector.getName(target), () => {

        if (typeof testInstance['before'] === 'function') {
            testInstance['before']();
        }

        const testExecution: Array<Promise<any>> = [];

        testsToRun.forEach((testRegistration: ITestRegistration) => {

            testExecution.push(
                run(testRegistration)
            );
        });

        Promise.all(testExecution).then(() => {

            if (typeof testInstance['after'] === 'function') {
                testInstance['after']();
            }
        });
    });

    return target;
}