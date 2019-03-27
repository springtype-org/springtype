import {ON_FIELD_CHANGE_CALLBACKS} from "../constant/ON_FIELD_CHANGE_CALLBACKS";
import {FieldChangeCallbackRegistration} from "../interface/FieldChangeCallbackRegistration";

export const setOnFieldChangeCallbacks = (prototype: any, onFieldChangeCallbacks: Array<FieldChangeCallbackRegistration>) =>
    Reflect.set(prototype, ON_FIELD_CHANGE_CALLBACKS, onFieldChangeCallbacks);