const EVENT_ATTRIBUTES = 'EVENT_ATTRIBUTES';

export const getEventAttributes = (prototype: any) => Reflect.get(prototype, EVENT_ATTRIBUTES) || [];

export const setEventAttributes = (prototype: any, eventAttributes: Array<string>) =>
    Reflect.set(prototype, EVENT_ATTRIBUTES, eventAttributes) || [];