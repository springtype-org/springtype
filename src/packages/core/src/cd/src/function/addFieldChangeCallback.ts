import {FieldChangeCallbackRegistration} from "../interface/FieldChangeCallbackRegistration";
import {getOnFieldChangeCallbacks, setOnFieldChangeCallbacks} from "../reflector/fieldChangeCallbacks";

export const addFieldChangeCallback = (prototype: any, methodName: any, fieldName: string) => {

    const onFieldChangeCallbacks: Array<FieldChangeCallbackRegistration> = getOnFieldChangeCallbacks(prototype.constructor);

    onFieldChangeCallbacks.push({
        fieldName,
        methodName
    });

    setOnFieldChangeCallbacks(prototype.constructor, onFieldChangeCallbacks);
};