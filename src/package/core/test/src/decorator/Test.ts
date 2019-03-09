import {RETURNS_ASSERT_VALUE} from "./TestSuite";

export const TEST_CONFIGS = 'TEST_CONFIGS';
export const TEST_METHOD_WRAPPED_FLAG = 'TEST_METHOD_WRAPPED_FLAG';

export interface ITestConfig {
    params?: Array<any>;
    returns: any;
    equalType?: any;
}

export interface ITestRegistration {
    methodName: string;
    testConfig: ITestConfig;
}

export const Test = (testConfig: ITestConfig) => (clazz: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

    //console.log('testConfig', testConfig, target, propertyName, descriptor);

    //console.log('@Test', target);

    let superMethod = descriptor.value;

    const existingTestConfigs = Reflect.get(clazz.constructor, TEST_CONFIGS) || [];

    Reflect.set(clazz.constructor, TEST_CONFIGS, [...existingTestConfigs, {
        methodName: methodName,
        testConfig
    }]);

    // in case of multiple @Test decorations on the same original method
    // implementation the
    if (!Reflect.get(descriptor.value, TEST_METHOD_WRAPPED_FLAG)) {

        // wrap method
        descriptor.value = function () {

            // call original impl. method
            let realReturnValue = superMethod.apply(this, arguments);

            let assertReturn = Reflect.get(clazz[methodName], RETURNS_ASSERT_VALUE);

            console.log(methodName, 'Return', realReturnValue, 'should be', assertReturn);

            /*
            if (!PropertyComparator.equal(realReturnValue, assertReturn, testConfig.equalType || CompareType.PARTIAL)) {
                throw new Error("FAIL: Return value and asserted value differ");
            }
            */
            return realReturnValue;
        };

        Reflect.set(descriptor.value, TEST_METHOD_WRAPPED_FLAG, true);
    }
};