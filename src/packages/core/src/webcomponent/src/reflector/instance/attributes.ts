import {getAttributeChangeCallbacks} from "../protoype/attributeChangeCallbacks";
import {AttributeChangeCallbackRegistration} from "../../interface/AttributeChangeCallbackRegistration";
import {isAttributeObserved, ObservedAttribute} from "../protoype/observedAttributes";

const ATTRIBUTE_DEFAULT_INITIALIZED = 'ATTRIBUTE_DEFAULT_INITIALIZED_';
const ATTRIBUTE_VALUE = "ATTRIBUTE_VALUE_";
const ATTRIBUTE_HOOK_REGISTERED = 'TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED';

// Web Standard API naming, do NOT change
const GET_ATTRIBUTE_METHOD_NAME = 'getAttribute';
const SET_ATTRIBUTE_METHOD_NAME = 'setAttribute';
const ATTRIBUTES_GETTER_NAME = 'attributes';


export const getAttribute = (instance: any, attributeName: string) =>
    Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName) as string);

export const setAttribute = (instance: any, attributeName: string, value: any) => {
    Reflect.set(instance, (ATTRIBUTE_VALUE + attributeName) as string, value);
};

export const initializeAttributes = (instance: any, prototype: any, observedAttributes: ObservedAttribute[]) => {
    // set default attribute values (initial)
    observedAttributes.forEach((observedAttribute: ObservedAttribute) => {
        const attributeName = observedAttribute.name.toString();
        if (!Reflect.get(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName))) {
            setAttribute(instance, attributeName, instance[attributeName]);
            executeOnAttributeChangeCallbacks(prototype, instance, attributeName);
            Reflect.set(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName) as string, instance[attributeName]);
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

export const registerAttributeHooks = (instance: any, observedAttributes: ObservedAttribute[]) => {

    // if transparent hooks are not yet registered for this @Attribute...
    if (!Reflect.get(instance, (ATTRIBUTE_HOOK_REGISTERED))) {

        // $webComponent.getAttribute(...) [native]
        const originalGetAttribute = instance[GET_ATTRIBUTE_METHOD_NAME].bind(instance);

        // replace $webComponent.getAttribute(...)
        instance[GET_ATTRIBUTE_METHOD_NAME] = (attributeName: string) => {

            // if attribute is not @Attribute observed, call native
            // $webComponent.getAttribute(...)
            if (!isAttributeObserved(observedAttributes, attributeName)) {
                return originalGetAttribute(attributeName);
            }

            // else return transparent value
            return getAttribute(instance, attributeName);
        };

        // $webComponent.setAttribute(...) [native]
        const originalSetAttribute = instance[SET_ATTRIBUTE_METHOD_NAME].bind(instance);

        // replace $webComponent.setAttribute(...)
        instance[SET_ATTRIBUTE_METHOD_NAME] = (attributeName: string, value: any) => {

            // if attribute is not @Attribute observed, call native
            // $webComponent.getAttribute(...)
            if (isAttributeObserved(observedAttributes, attributeName)) {
                setAttribute(instance, attributeName, value);
            }

            // else return transparent value
            return originalSetAttribute(attributeName, value);
        };

        // $webComponent.attributes [native]
        const originalAttributes = instance[ATTRIBUTES_GETTER_NAME];

        // replace $webComponent.attributes
        Object.defineProperty(instance, ATTRIBUTES_GETTER_NAME, {
            get: () => {
                // get all native $webComponent.attributes
                const attributes = originalAttributes;
                // enrich them with @Attribute added attributes
                observedAttributes.forEach((observedAttribute: ObservedAttribute) => {
                    attributes[observedAttribute.name] = instance[observedAttribute.name];
                });
                return attributes;
            }

        });

        Reflect.set(instance, (ATTRIBUTE_HOOK_REGISTERED) as string, true);
    }
};