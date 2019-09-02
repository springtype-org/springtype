import {ComponentReflector} from "../ComponentReflector";
import {ApplicationContext} from "../ApplicationContext";
import {ArgumentsInjectionMetadata} from "../interface/ArgumentsInjectionMetadata";
import {resolveInjectionArgumentValue} from "../function/resolveInjectionArgumentValue";

export function Autowired(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function | any>) {

    const methodArgumentTypes = ComponentReflector.getMethodArgumentTypes(target, propertyName);

    // backup original method
    const method: Function = <Function>descriptor.value;

    // we replace the method again, the call the original impl. with injected arguments
    descriptor.value = function () {

        const cmp = ApplicationContext.getInstance().getComponent(target.constructor);

        if (!cmp) {
            throw new Error('@Autowired on methods requires @Component on the class.');
        }

        const isTestComponent = ComponentReflector.getIsMockComponent(
            cmp
        );

        // replacement method impl. -> this is called when the actual @BeanMethod annotated method is called (hook)
        const argumentsInjectionMetaData: ArgumentsInjectionMetadata =
            ComponentReflector.getMethodArgumentsInjectionMetadata(
                target, propertyName
            );

        // 1. Copy initial argument values (non-optionals, default values)
        const newArgs: Array<any> = [...argumentsInjectionMetaData.arguments];

        // 2. There might be @Inject(...) decorations, process them and inject

        // copy arguments over into new arguments array (because arguments are immutable in modern times ;)
        // some index are maybe empty / undefined.
        for (let i = 0; i < argumentsInjectionMetaData.arguments.length; i++) {
            // resolve override injection argument
            const injectionValue = resolveInjectionArgumentValue(argumentsInjectionMetaData.arguments[i]);

            // conditionally overwrite original call argument for sub-call
            if (typeof injectionValue !== 'undefined') {

                newArgs[i] = injectionValue;

            } else if (argumentsInjectionMetaData.arguments[i]) {

                // parameter has @Inject() decorator, but no explicit value; fallback to default strategy
                if (methodArgumentTypes[i]) {

                    // fetch singleton from cache by reflected type
                    newArgs[i] = ApplicationContext.getInstance().getBean(
                        methodArgumentTypes[i],
                        argumentsInjectionMetaData.arguments[i]
                    );
                }
            }
        }

        // 3. For all arguments that are appended optional and are not passed and not injects by @Inject(...)
        //    try to inject them using their type reference
        for (let i = arguments.length; i < methodArgumentTypes.length; i++) {

            if (typeof newArgs[i] === 'undefined' &&
                ComponentReflector.isComponent(methodArgumentTypes[i])) {


                newArgs[i] = ApplicationContext.getInstance().getBean(
                    methodArgumentTypes[i]);
            }
        }
        return method.apply(this, newArgs);
    }
}