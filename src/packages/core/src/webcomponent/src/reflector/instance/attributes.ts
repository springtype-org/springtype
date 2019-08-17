import {getAttributeChangeCallbacks} from "../protoype/attributeChangeCallbacks";
import {AttributeChangeCallbackRegistration} from "../../interface/AttributeChangeCallbackRegistration";
import {isAttributeObserved, ObservedAttribute} from "../protoype/observedAttributes";

const ATTRIBUTE_HOOK_REGISTERED = 'TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED';

// Web Standard API naming, do NOT change
const GET_ATTRIBUTE_METHOD_NAME = 'getAttribute';
const SET_ATTRIBUTE_METHOD_NAME = 'setAttribute';
const ATTRIBUTES_GETTER_NAME = 'attributes';

const ST_ATTRIBUTE = 'ST_ATTRIBUTE';

interface StAttributeModel {
    initValue?: any;
    value?: any;
    cd?: boolean;
}
const getStAttributes = (instance: any): { [key: string]: StAttributeModel; } =>
    Reflect.get(instance, ST_ATTRIBUTE) || {};

export const getAttributeValue = (instance: any, attributeName: string) =>
    getStAttributes(instance)[attributeName].value;

export const getStAttributeModel = (instance: any, attributeName: string) =>
    getStAttributes(instance)[attributeName];

export const setAttributeValue = (instance: any, attributeName: string, value: any) => {
    let fields: { [key: string]: StAttributeModel; } = getStAttributes(instance);
    fields[attributeName].value = value;
    Reflect.set(instance, ST_ATTRIBUTE, fields);
};
export const setAttributeChangeDetection = (instance: any, attributeName: string) => {
    let fields: { [key: string]: StAttributeModel; } = getStAttributes(instance);
    fields[attributeName].cd = true;
    Reflect.set(instance, ST_ATTRIBUTE, fields);
};

export const setAttributeInit = (instance: any, attributeName: string, initValue: any) => {
    let fields: { [key: string]: StAttributeModel; } = getStAttributes(instance);
    fields[attributeName] = {initValue: initValue, value: initValue};
    Reflect.set(instance, ST_ATTRIBUTE, fields);
};

export const initializeAttributes = (instance: any, prototype: any, observedAttributes: ObservedAttribute[]) => {
    // set default attribute values (initial)
    observedAttributes.forEach((observedAttribute: ObservedAttribute) => {
        const attributeName = observedAttribute.name.toString();
        if (!getStAttributes(instance)[attributeName]) {
            setAttributeInit(instance, attributeName, instance[attributeName]);
            executeOnAttributeChangeCallbacks(prototype, instance, attributeName);
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
            return getAttributeValue(instance, attributeName);
        };

        // $webComponent.setAttribute(...) [native]
        const originalSetAttribute = instance[SET_ATTRIBUTE_METHOD_NAME].bind(instance);

        // replace $webComponent.setAttribute(...)
        instance[SET_ATTRIBUTE_METHOD_NAME] = (attributeName: string, value: any) => {
            // if attribute is not @Attribute observed, call native
            // $webComponent.getAttribute(...)
            if (isAttributeObserved(observedAttributes, attributeName)) {
                setAttributeValue(instance, attributeName, value);
                instance.changeAttribute(attributeName, value)
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