import {getAttributeChangeCallbacks} from "../function/getAttributeChangeCallbacks";
import {setAttributeChangeCallbacks} from "../function/setAttributeChangeCallbacks";

export function OnAttributeChange(attributeName: string): any {

    return (prototype: any, methodName: any) => {

        const attributeChangeCallbacks = getAttributeChangeCallbacks(prototype.constructor);

        attributeChangeCallbacks.push({
            methodName,
            attributeName
        });

        setAttributeChangeCallbacks(prototype.constructor, attributeChangeCallbacks);

        return prototype;
    };
}