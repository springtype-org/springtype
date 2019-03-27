import {WebComponentReflector} from "../WebComponentReflector";

export const isWebComponent = (tagName: string) =>
    WebComponentReflector.getAll().indexOf((tagName || '').toUpperCase()) !== -1;