import {getOnFieldChangeCallbacks} from "../function/getOnFieldChangeCallbacks";
import {FieldChangeCallbackRegistration} from "../interface/FieldChangeCallbackRegistration";
import {setOnFieldChangeCallbacks} from "../function/setOnFieldChangeCallbacks";

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