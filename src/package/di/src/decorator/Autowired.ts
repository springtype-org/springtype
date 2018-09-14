import {
    INJECT_DECORATOR_METADATA_KEY,
    ParameterInjectionMetaData, resolveInjectionParameterValue
} from "./Inject";
import {BeanFactory} from "../BeanFactory";

export function Autowired(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function | any>) {

    const reflectedParamTypes = Reflect.getMetadata('design:paramtypes', target, propertyName) || [];

    // backup original method
    const method: Function = <Function> descriptor.value;

    // we replace the method again, the call the original impl. with injected arguments
    descriptor.value = function() {

        // replacement method impl. -> this is called when the actual @BeanMethod annotated method is called (hook)

        const parameterInjectionMetaData: ParameterInjectionMetaData = Reflect.getOwnMetadata(
            INJECT_DECORATOR_METADATA_KEY, target, propertyName
        );

        const newArgs = [];

        // first, copy initial arguments
        for (let i=0; i<arguments.length; i++) {
            newArgs[i] = arguments[i];
        }

        if (parameterInjectionMetaData &&
            parameterInjectionMetaData.parameters &&
            parameterInjectionMetaData.parameters.length) {

            // copy arguments over into new arguments array (because arguments are immutable in modern times ;)
            for (let i=0; i<parameterInjectionMetaData.parameters.length; i++) {


                // resolve override injection argument
                const injectionValue = resolveInjectionParameterValue(parameterInjectionMetaData, i);

                // conditionally overwrite original call argument for sub-call
                if (typeof injectionValue !== 'undefined') {

                    newArgs[i] = injectionValue;

                } else if (parameterInjectionMetaData.parameters[i]) {

                    // parameter has @Inject decorator, but no explicit value; fallback to singleton strategy!
                    if (reflectedParamTypes[i]) {

                        // fetch singleton from cache by reflected type
                        newArgs[i] = BeanFactory.getBean(reflectedParamTypes[i]);
                    }
                }
            }
        }
        return method.apply(this, newArgs);
    }
}