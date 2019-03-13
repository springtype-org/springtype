import {AttributeChangeCallbackRegistration} from "../interface/AttributeChangeCallbackRegistration";
import {ATTRIBUTE_CHANGE_CALLBACKS} from "../constant/ATTRIBUTE_CHANGE_CALLBACKS";

export const getAttributeChangeCallbacks = (instance: any): Array<AttributeChangeCallbackRegistration> =>
    Reflect.get(instance, ATTRIBUTE_CHANGE_CALLBACKS) || [];