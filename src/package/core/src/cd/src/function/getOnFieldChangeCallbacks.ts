import {ON_FIELD_CHANGE_CALLBACKS} from "../constant/ON_FIELD_CHANGE_CALLBACKS";

export const getOnFieldChangeCallbacks = (prototype: any) => Reflect.get(prototype, ON_FIELD_CHANGE_CALLBACKS) || [];