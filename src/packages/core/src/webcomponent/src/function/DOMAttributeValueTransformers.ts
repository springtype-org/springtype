export const transformBooleanDOMAttributeValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
        return value;
    } else {
        //check if variable is false
        if (value === 'false') {
            return false;
        }
        // i.e.: "disabled" on an HTML element ends in an empty string which should
        // be transformed to: true. Likewise disabled="disabled" should end up as true whereas
        // no presence at all should result in false.
        return typeof value !== 'undefined';
    }
};
export const transformFloatDOMAttributeValue = (value: string | number) => parseFloat(value.toString());
export const transformIntDOMAttributeValue = (value: string | number) => parseInt(value.toString());