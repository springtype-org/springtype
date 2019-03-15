import {AttributeChangeCallbackRegistration} from "../interface/AttributeChangeCallbackRegistration";
import {ATTRIBUTE_CHANGE_CALLBACKS} from "../constant/ATTRIBUTE_CHANGE_CALLBACKS";

export const getAttributeChangeCallbacks = (prototype: any): Array<AttributeChangeCallbackRegistration> =>
    Reflect.get(prototype, ATTRIBUTE_CHANGE_CALLBACKS) || [];