import {AttributeChangeCallbackRegistration} from "../interface/AttributeChangeCallbackRegistration";
import {getAttributeChangeCallbacks} from "./getAttributeChangeCallbacks";

export const executeOnAttributeChangeCallbacks = (prototype: any, instance: any, attributeName: string) => {

    const attributeChangeCallbacks: Array<AttributeChangeCallbackRegistration> = getAttributeChangeCallbacks(prototype);

    attributeChangeCallbacks.forEach(
        (attributeChangeCallbackRegistration: AttributeChangeCallbackRegistration) => {

            if (attributeChangeCallbackRegistration.attributeName === attributeName) {
                instance[attributeChangeCallbackRegistration.methodName]();
            }
        });
};