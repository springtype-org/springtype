import {OBSERVED_ATTRIBUTES} from "../constant/OBSERVED_ATTRIBUTES";

export const setObservedAttributes = (prototype: any, observedAttributes: Array<string>) =>
    Reflect.set(prototype, OBSERVED_ATTRIBUTES, observedAttributes) || [];