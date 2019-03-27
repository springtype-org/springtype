import {AttributeChangeCallbackRegistration} from "../interface/AttributeChangeCallbackRegistration";
import {ATTRIBUTE_CHANGE_CALLBACKS} from "../constant/ATTRIBUTE_CHANGE_CALLBACKS";

export const setAttributeChangeCallbacks = (prototype: any, attributeChangeCallbacks: Array<AttributeChangeCallbackRegistration>) =>
    Reflect.set(prototype, ATTRIBUTE_CHANGE_CALLBACKS, attributeChangeCallbacks) || [];