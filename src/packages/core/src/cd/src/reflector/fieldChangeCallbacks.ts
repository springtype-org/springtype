import {FieldChangeCallbackRegistration} from "../interface/FieldChangeCallbackRegistration";

const ON_FIELD_CHANGE_CALLBACKS = 'ON_FIELD_CHANGE_CALLBACKS';

export const setFieldChangeCallbacks = (prototype: any, onFieldChangeCallbacks: Array<FieldChangeCallbackRegistration>) =>
    Reflect.set(prototype, ON_FIELD_CHANGE_CALLBACKS, onFieldChangeCallbacks);

export const getFieldChangeCallbacks = (prototype: any) =>
    Reflect.get(prototype, ON_FIELD_CHANGE_CALLBACKS) || [];