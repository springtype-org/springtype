import {getAttributeChangeCallbacks, setAttributeChangeCallbacks} from "../reflector/protoype/attributeChangeCallbacks";

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