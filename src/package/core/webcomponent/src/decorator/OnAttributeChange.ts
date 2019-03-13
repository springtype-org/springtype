import {ATTRIBUTE_CHANGE_CALLBACKS} from "../constant/ATTRIBUTE_CHANGE_CALLBACKS";
import {getAttributeChangeCallbacks} from "../function/getAttributeChangeCallbacks";

export function OnAttributeChange(attributeName: string): any {

    return (instance: any, methodName: any) => {

        const attributeChangeCallbacks = getAttributeChangeCallbacks(instance);

        attributeChangeCallbacks.push({
            methodName,
            attributeName
        });

        Reflect.set(instance, ATTRIBUTE_CHANGE_CALLBACKS, attributeChangeCallbacks);

        return instance;
    };
}