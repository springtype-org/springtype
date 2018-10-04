import {
    ArgumentsInjectionMetaData, resolveInjectionParameterValue
} from "./Inject";
import {InjectionProfile} from "../BeanFactory";
import {ComponentReflector} from "../ComponentReflector";
import {ApplicationContext} from "../ApplicationContext";

export function Autowired(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function | any>) {

    const methodArgumentTypes = ComponentReflector.getMethodArgumentTypes(target, propertyName);

    // backup original method
    const method: Function = <Function> descriptor.value;

    // we replace the method again, the call the original impl. with injected arguments
    descriptor.value = function() {

        const cmp = ApplicationContext.getInstance().getComponent(target.constructor);

        if (!cmp) {
            throw new Error('@Autowired on methods requires @Component on the class.');
        }

        const isTestComponent = ComponentReflector.getIsMockComponent(
            cmp
        );

        // replacement method impl. -> this is called when the actual @BeanMethod annotated method is called (hook)
        const argumentsInjectionMetaData: ArgumentsInjectionMetaData =
            ComponentReflector.getMethodArgumentsInjectionMetadata(
                target, propertyName
            );

        const newArgs = [];

        // 1. Copy initial argument values (non-optionals, default values)
        for (let i=0; i<arguments.length; i++) {
            newArgs[i] = arguments[i];
        }

        // 2. There might be @Inject(...) decorations, process them and inject
        if (argumentsInjectionMetaData &&
            argumentsInjectionMetaData.arguments &&
            argumentsInjectionMetaData.arguments.length) {

            // copy arguments over into new arguments array (because arguments are immutable in modern times ;)
            for (let i=0; i<argumentsInjectionMetaData.arguments.length; i++) {

                // resolve override injection argument
                const injectionValue = resolveInjectionParameterValue(argumentsInjectionMetaData, i, isTestComponent);

                // conditionally overwrite original call argument for sub-call
                if (typeof injectionValue !== 'undefined') {

                    newArgs[i] = injectionValue;

                } else if (argumentsInjectionMetaData.arguments[i]) {

                    // parameter has @Inject() decorator, but no explicit value; fallback to default strategy
                    if (methodArgumentTypes[i]) {

                        // fetch singleton from cache by reflected type
                        newArgs[i] = ApplicationContext.getInstance().getBean(
                            methodArgumentTypes[i],
                            isTestComponent ? InjectionProfile.TEST : InjectionProfile.DEFAULT,
                            argumentsInjectionMetaData.arguments[i].injectionStrategy
                        );
                    }
                }
            }
        }

        // 3. For all arguments that are appended optional and are not passed and not injects by @Inject(...)
        //    try to inject them using their type reference
        for (let i=arguments.length; i<methodArgumentTypes.length; i++) {

            if (typeof newArgs[i] === 'undefined' &&
                ComponentReflector.isComponent(methodArgumentTypes[i])) {


                newArgs[i] = ApplicationContext.getInstance().getBean(
                    methodArgumentTypes[i],
                    isTestComponent ? InjectionProfile.TEST : InjectionProfile.DEFAULT
                );
            }
        }
        return method.apply(this, newArgs);
    }
}