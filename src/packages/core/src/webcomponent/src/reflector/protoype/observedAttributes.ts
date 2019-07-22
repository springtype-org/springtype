const OBSERVED_ATTRIBUTES = 'OBSERVED_ATTRIBUTES';

export interface ObservedAttribute {
    name: string | symbol,
    type: string;
}

export const setObservedAttributes = (prototype: any, observedAttributes: ObservedAttribute[]) =>
    Reflect.set(prototype, OBSERVED_ATTRIBUTES, observedAttributes) || [];

export const getObservedAttributes = (prototype: any): ObservedAttribute[] => Reflect.get(prototype, OBSERVED_ATTRIBUTES) || [];

export const isAttributeObserved = (observedAttributes: ObservedAttribute[], attributeName: string | symbol): boolean => {
    const found = observedAttributes.find((observedAttribute: ObservedAttribute) => observedAttribute.name == attributeName);
    console.log('isAttributeObserved',observedAttributes, attributeName, !!found);
    return !!found;
};