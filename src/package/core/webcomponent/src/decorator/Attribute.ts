import {OBSERVED_ATTRIBUTES} from "../constant/OBSERVED_ATTRIBUTES";
import {getObservedAttributes} from "../function/getObservedAttributes";

export function Attribute(webComponentInstance: any, attributeName: string | symbol): any {

    const observedAttributes = getObservedAttributes(webComponentInstance.constructor);
    observedAttributes.push(attributeName);
    Reflect.set(webComponentInstance.constructor, OBSERVED_ATTRIBUTES, observedAttributes);
}