import {WebComponentReflector} from "../WebComponentReflector";

export const isWebComponent = (tagName: string) => typeof WebComponentReflector.getByTagName(tagName) != undefined;