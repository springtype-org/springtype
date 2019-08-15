import {addFieldChangeCallback} from "../function/addFieldChangeCallback";

export function OnFieldChange(fieldName: string): any {

    return (prototype: any, methodName: any) => {

        addFieldChangeCallback(prototype, methodName, fieldName);

        return prototype;
    };
}