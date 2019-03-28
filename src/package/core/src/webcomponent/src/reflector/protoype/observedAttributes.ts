const OBSERVED_ATTRIBUTES = 'OBSERVED_ATTRIBUTES';

export const setObservedAttributes = (prototype: any, observedAttributes: Array<string>) =>
    Reflect.set(prototype, OBSERVED_ATTRIBUTES, observedAttributes) || [];

export const getObservedAttributes = (prototype: any) => Reflect.get(prototype, OBSERVED_ATTRIBUTES) || [];