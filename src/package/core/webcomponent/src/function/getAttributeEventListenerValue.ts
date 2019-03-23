import {getEventAttributes} from "./getEventAttributes";
import {error} from "../../../logger";

export const getAttributeEventListenerValue = (prototype: any, attributeName: string, attributeValueIdOrValue: any, scope: any): any => {

    const eventAttributes = getEventAttributes(prototype);

    if (eventAttributes.indexOf(attributeName) !== -1) {

        if (typeof attributeValueIdOrValue == 'function') {

            return attributeValueIdOrValue.bind(scope);

        } else if (typeof attributeValueIdOrValue == 'string') {

            return function() {
                return eval(attributeValueIdOrValue);
            }.bind(scope);

        } else {
            return function() {

                error('Event listener set for ' + attributeName + ' is neither code nor function.');

            }.bind(scope);
        }
    }
    return null;
};