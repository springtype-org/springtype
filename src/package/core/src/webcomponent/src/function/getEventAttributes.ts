import {EVENT_ATTRIBUTES} from "../constant/EVENT_ATTRIBUTES";

export const getEventAttributes = (prototype: any) => Reflect.get(prototype, EVENT_ATTRIBUTES) || [];