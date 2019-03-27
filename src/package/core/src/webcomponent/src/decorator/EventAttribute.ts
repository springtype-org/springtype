import {Attribute} from "./Attribute";
import {getEventAttributes} from "../function/getEventAttributes";
import {setEventAttributes} from "../function/setEventAttributes";

export function EventAttribute(webComponentInstance: any, attributeName: string | symbol): any {

    // an event is an attribute with added annotation to transform string functions
    // into evaluated functions (in case of plain HTML use, integration)
    Attribute(webComponentInstance, attributeName);

    const eventAttributes = getEventAttributes(webComponentInstance.constructor);
    eventAttributes.push(attributeName);
    setEventAttributes(webComponentInstance.constructor, eventAttributes);

}