import {OBSERVED_ATTRIBUTES} from "../constant/OBSERVED_ATTRIBUTES";

export const getObservedAttributes = (prototype: any) => Reflect.get(prototype, OBSERVED_ATTRIBUTES) || [];