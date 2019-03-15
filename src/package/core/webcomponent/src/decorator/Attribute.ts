import {OBSERVED_ATTRIBUTES} from "../constant/OBSERVED_ATTRIBUTES";
import {getObservedAttributes} from "../function/getObservedAttributes";
import {ComponentReflector} from "../../../di";
import {ATTRIBUTE_VALUE} from "../constant/ATTRIBUTE_VALUE";
import {ATTRIBUTE_REGISTERED} from "../constant/ATTRIBUTE_REGISTERED";
import {getAttributeChangeCallbacks} from "../function/getAttributeChangeCallbacks";
import {AttributeChangeCallbackRegistration} from "../interface/AttributeChangeCallbackRegistration";
import {TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED} from "../constant/TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED";
import {ATTRIBUTES_GETTER_NAME} from "../constant/ATTRIBUTES_GETTER_NAME";
import {GET_ATTRIBUTE_METHOD_NAME} from "../constant/GET_ATTRIBUTE_METHOD_NAME";
import {TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED} from "../constant/TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED";

export function Attribute(webComponentInstance: any, attributeName: string | symbol): any {

    const observedAttributes = getObservedAttributes(webComponentInstance.constructor);
    observedAttributes.push(attributeName);

    Reflect.set(webComponentInstance.constructor, OBSERVED_ATTRIBUTES, observedAttributes);

    const executeOnAttributeChangeCallbacks = (instance: any, attributeName: string) => {

        const attributeChangeCallbacks: Array<AttributeChangeCallbackRegistration> =
            getAttributeChangeCallbacks(webComponentInstance.constructor);

        attributeChangeCallbacks.forEach(
            (attributeChangeCallbackRegistration: AttributeChangeCallbackRegistration) => {

                if (attributeChangeCallbackRegistration.attributeName === attributeName) {
                    instance[attributeChangeCallbackRegistration.methodName]();
                }
            });
    };

    const _setAttribute = (instance: any, attributeName: string, value: any) => {
        Reflect.set(instance, (ATTRIBUTE_VALUE + attributeName) as string,value);
    };

    ComponentReflector.addInitializer(webComponentInstance.constructor, (instance: any) => {

        // set default attribute values
        observedAttributes.forEach((attributeName: string) => {

            if (!Reflect.get(instance, (TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED + attributeName))) {

                _setAttribute(instance, attributeName, instance[attributeName]);
                executeOnAttributeChangeCallbacks(instance, attributeName);

                Reflect.set(instance, (TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED + attributeName) as string, true);
            }
        });

        observedAttributes.forEach((attributeName: string) => {

            if (!Reflect.get(instance, (ATTRIBUTE_REGISTERED + attributeName))) {

                Object.defineProperty(instance, attributeName, {
                    set: (newValue: any) => {

                        const oldValue = instance[attributeName];
                        const changeCancelled = instance.onBeforeAttributeChange(attributeName, oldValue, newValue);

                        if (!changeCancelled) {

                            _setAttribute(instance, attributeName, newValue);

                            executeOnAttributeChangeCallbacks(instance, attributeName);

                            instance.reflowOnAttributeChange(attributeName, oldValue, newValue);
                        }
                        return true;
                    },
                    get: (): any => Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName) as string),
                });

                Reflect.set(instance, (ATTRIBUTE_REGISTERED + attributeName) as string, true);
            }
        });

        if (!Reflect.get(instance, (TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED))) {

            const originalGetAttribute = instance[GET_ATTRIBUTE_METHOD_NAME].bind(instance);

            instance[GET_ATTRIBUTE_METHOD_NAME] = (attributeName: string) => {

                if (observedAttributes.indexOf(attributeName) === -1) {
                    return originalGetAttribute(attributeName);
                }
                return Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName) as string);
            };

            const originalAttributes = instance[ATTRIBUTES_GETTER_NAME];

            Object.defineProperty(instance, ATTRIBUTES_GETTER_NAME, {
                get: () => {

                    const attributes = originalAttributes;

                    observedAttributes.forEach((observedAttributeName: string) => {
                        attributes[observedAttributeName] = instance[observedAttributeName];
                    });
                    return attributes;
                }
            });

            Reflect.set(instance, (TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED) as string, true);
        }
    })
}