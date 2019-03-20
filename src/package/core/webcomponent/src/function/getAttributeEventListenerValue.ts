import {getEventAttributes} from "./getEventAttributes";

export const getAttributeEventListenerValue = (prototype: any, attributeName: string, attributeValueIdOrValue: any, scope: any): any => {

    const eventAttributes = getEventAttributes(prototype);

    if (eventAttributes.indexOf(attributeName) !== -1) {
        return function() {
            return eval(attributeValueIdOrValue);
        }.bind(scope);
    }
    return null;
};