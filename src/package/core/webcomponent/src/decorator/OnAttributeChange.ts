import {ATTRIBUTE_CHANGE_CALLBACKS} from "../constant/ATTRIBUTE_CHANGE_CALLBACKS";
import {getAttributeChangeCallbacks} from "../function/getAttributeChangeCallbacks";

export function OnAttributeChange(attributeName: string): any {

    return (prototype: any, methodName: any) => {

        const attributeChangeCallbacks = getAttributeChangeCallbacks(prototype.constructor);

        attributeChangeCallbacks.push({
            methodName,
            attributeName
        });

        Reflect.set(prototype.constructor, ATTRIBUTE_CHANGE_CALLBACKS, attributeChangeCallbacks);

        return prototype;
    };
}