import {EVENT_ATTRIBUTES} from "../constant/EVENT_ATTRIBUTES";

export const setEventAttributes = (prototype: any, eventAttributes: Array<string>) =>
    Reflect.set(prototype, EVENT_ATTRIBUTES, eventAttributes) || [];