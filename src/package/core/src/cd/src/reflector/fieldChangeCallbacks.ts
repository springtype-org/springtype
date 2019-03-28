import {FieldChangeCallbackRegistration} from "../interface/FieldChangeCallbackRegistration";

const ON_FIELD_CHANGE_CALLBACKS = 'ON_FIELD_CHANGE_CALLBACKS';

export const setOnFieldChangeCallbacks = (prototype: any, onFieldChangeCallbacks: Array<FieldChangeCallbackRegistration>) =>
    Reflect.set(prototype, ON_FIELD_CHANGE_CALLBACKS, onFieldChangeCallbacks);

export const getOnFieldChangeCallbacks = (prototype: any) =>
    Reflect.get(prototype, ON_FIELD_CHANGE_CALLBACKS) || [];