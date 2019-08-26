import {ComponentReflector} from "../ComponentReflector";
import {ApplicationContext} from "../ApplicationContext";
import {InjectionProfile} from "../enum/InjectionProfile";
import {InjectionReference} from "../type/InjectionReference";
import {ArgumentsInjectionMetadata} from "../interface/ArgumentsInjectionMetadata";
import {ArgumentInjectionMetadata} from "../interface/ArgumentInjectionMetadata";

export function resolveInjectionArgumentValue(
    argumentInjectionMetaData: ArgumentInjectionMetadata | undefined,
    isTestComponent: boolean
) {

    let injectionValue: any;

    if (!argumentInjectionMetaData) return;

    const injectionReference: InjectionReference =
        argumentInjectionMetaData.injectionReference;

    if (typeof injectionReference !== 'undefined') {

        if (typeof injectionReference === 'function') {

            if (ComponentReflector.isComponent(injectionReference)) {

                // it is not a InjectBeanFactory, just use the instance
                injectionValue = ApplicationContext.getInstance().getBean(
                    injectionReference,
                    argumentInjectionMetaData,
                    isTestComponent ? InjectionProfile.TEST : InjectionProfile.DEFAULT,
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