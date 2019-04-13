import {getAttributeChangeCallbacks} from "../protoype/attributeChangeCallbacks";
import {AttributeChangeCallbackRegistration} from "../../interface/AttributeChangeCallbackRegistration";
import {ATTRIBUTE_TRANSFORM_FN_NAME} from "../../..";

const ATTRIBUTE_DEFAULT_INITIALIZED = 'ATTRIBUTE_DEFAULT_INITIALIZED';
const ATTRIBUTE_VALUE = "ATTRIBUTE_VALUE_";
const ATTRIBUTE_HOOK_REGISTERED = 'TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED';

// Web Standard API naming, do NOT change
const GET_ATTRIBUTE_METHOD_NAME = 'getAttribute';
const ATTRIBUTES_GETTER_NAME = 'attributes';

export const getAttribute = (instance: any, attributeName: string) =>
    Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName) as string);

export const setAttribute = (instance: any, attributeName: string, value: any) => {
    Reflect.set(instance, (ATTRIBUTE_VALUE + attributeName) as string,value);
};

export const initializeAttributes = (instance: any, prototype: any, observedAttributes: Array<string>) => {
    // set default attribute values (initial)
    observedAttributes.forEach((attributeName: string) => {

        if (!Reflect.get(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName))) {

            const transformFn = Reflect.get(instance, ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString());

            setAttribute(instance, attributeName, transformFn ? transformFn(instance[attributeName]) : instance[attributeName]);
            executeOnAttributeChangeCallbacks(prototype, instance, attributeName);

            Reflect.set(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName) as string, true);
        }
    });
};

export const executeOnAttributeChangeCallbacks = (prototype: any, instance: any, attributeName: string) => {

    const attributeChangeCallbacks: Array<AttributeChangeCallbackRegistration> = getAttributeChangeCallbacks(prototype);

    attributeChangeCallbacks.forEach(
        (attributeChangeCallbackRegistration: AttributeChangeCallbackRegistration) => {

            if (attributeChangeCallbackRegistration.attributeName === attributeName) {
                instance[attributeChangeCallbackRegistration.methodName]();
            }
        });
};

export const registerAttributeHooks = (instance: any, observedAttributes: Array<string>) => {

    // if transparent hooks are not yet registered for this @Attribute...
    if (!Reflect.get(instance, (ATTRIBUTE_HOOK_REGISTERED))) {

        // $webComponent.getAttribute(...) [native]
        const originalGetAttribute = instance[GET_ATTRIBUTE_METHOD_NAME].bind(instance);

        // replace $webComponent.getAttribute(...)
        instance[GET_ATTRIBUTE_METHOD_NAME] = (attributeName: string) => {

            // if attribute is not @Attribute observed, call native
            // $webComponent.getAttribute(...)
            if (observedAttributes.indexOf(attributeName) === -1) {
                return originalGetAttribute(attributeName);
            }

            // else return transparent value
            return getAttribute(instance, attributeName);
        };

        // $webComponent.attributes [native]
        const originalAttributes = instance[ATTRIBUTES_GETTER_NAME];

        // replace $webComponent.attributes
        Object.defineProperty(instance, ATTRIBUTES_GETTER_NAME, {
            get: () => {

                // get all native $webComponent.attributes
                const attributes = originalAttributes;

                // enrich them with @Attribute added attributes
                observedAttributes.forEach((observedAttributeName: string) => {
                    attributes[observedAttributeName] = instance[observedAttributeName];
                });
                return attributes;
            }
        });

        Reflect.set(instance, (ATTRIBUTE_HOOK_REGISTERED) as string, true);
    }
};