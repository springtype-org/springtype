import {ComponentReflector} from "../ComponentReflector";
import {ApplicationContext} from "../ApplicationContext";
import {InjectionProfile} from "../enum/InjectionProfile";
import {InjectionReference} from "../type/InjectionReference";
import {ArgumentsInjectionMetadata} from "../interface/ArgumentsInjectionMetadata";

export function resolveInjectionArgumentValue(
    argumentsInjectionMetaData: ArgumentsInjectionMetadata,
    index: number,
    isTestComponent: boolean
) {

    let injectionValue: any;

    if (!argumentsInjectionMetaData.arguments[index]) return;

    const injectionReference: InjectionReference =
        argumentsInjectionMetaData.arguments[index].injectionReference;

    if (typeof injectionReference !== 'undefined') {

        if (typeof injectionReference === 'function') {

            if (ComponentReflector.isComponent(injectionReference)) {

                // it is not a InjectBeanFactory, just use the instance
                injectionValue = ApplicationContext.getInstance().getBean(
                    injectionReference,
                    isTestComponent ? InjectionProfile.TEST : InjectionProfile.DEFAULT,
                    argumentsInjectionMetaData.arguments[index].injectionStrategy,
                );

            } else {

                // case: function is not a InjectBeanFactory NOR registered bean -> inject function reference
                injectionValue = injectionReference;
            }

        } else {

            // use the value directly (any value case)
            injectionValue = injectionReference;
        }
    }
    return injectionValue;
}