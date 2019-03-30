import {getInternalRenderApi} from "../../../renderer/src/function/getInternalRenderApi";

export const getAttributeReferencedValue = (attributeValueIdOrValue: string): any => {

    // de-reference attribute value
    const attributeValue = getInternalRenderApi().attributeValueCache[attributeValueIdOrValue];
    delete getInternalRenderApi().attributeValueCache[attributeValueIdOrValue];
    return attributeValue || attributeValueIdOrValue;
};