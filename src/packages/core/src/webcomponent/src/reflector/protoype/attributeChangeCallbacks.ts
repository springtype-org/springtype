import {AttributeChangeCallbackRegistration} from "../../interface/AttributeChangeCallbackRegistration";

const ATTRIBUTE_CHANGE_CALLBACKS = 'ATTRIBUTE_CHANGE_CALLBACKS';

export const getAttributeChangeCallbacks = (prototype: any): Array<AttributeChangeCallbackRegistration> =>
    Reflect.get(prototype, ATTRIBUTE_CHANGE_CALLBACKS) || [];

export const setAttributeChangeCallbacks = (prototype: any, attributeChangeCallbacks: Array<AttributeChangeCallbackRegistration>) =>
    Reflect.set(prototype, ATTRIBUTE_CHANGE_CALLBACKS, attributeChangeCallbacks) || [];