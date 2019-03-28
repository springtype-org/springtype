import {FieldChangeCallbackRegistration} from "../interface/FieldChangeCallbackRegistration";
import {getOnFieldChangeCallbacks, setOnFieldChangeCallbacks} from "../reflector/fieldChangeCallbacks";

export function OnFieldChange(fieldName: string): any {

    return (prototype: any, methodName: any) => {

        const onFieldChangeCallbacks: Array<FieldChangeCallbackRegistration> = getOnFieldChangeCallbacks(prototype.constructor);

        onFieldChangeCallbacks.push({
            fieldName,
            methodName
        });

        setOnFieldChangeCallbacks(prototype.constructor, onFieldChangeCallbacks);

        return prototype;
    };
}