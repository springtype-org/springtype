import {ObservedField} from "../prototype/observedField";
import {getFieldChangeCallbacks} from "../fieldChangeCallbacks";
import {FieldChangeCallbackRegistration} from "../../interface/FieldChangeCallbackRegistration";

const FIELD_DEFAULT_INITIALIZED = 'FIELD_DEFAULT_INITIALIZED_';
const FIELD_VALUE = "FIELD_VALUE_";


export const getField = (instance: any, attributeName: string) =>
    Reflect.get(instance, (FIELD_VALUE + attributeName) as string);

export const setField = (instance: any, attributeName: string, value: any) => {
    Reflect.set(instance, (FIELD_VALUE + attributeName) as string, value);
};

export const initializeField = (instance: any, prototype: any, observedField: ObservedField[]) => {
    // set default field values (initial)
    observedField.forEach((observedField: ObservedField) => {
        const fieldName = observedField.name.toString();
        if (!Reflect.get(instance, (FIELD_DEFAULT_INITIALIZED + fieldName))) {
            setField(instance, fieldName, instance[fieldName]);
            executeOnFieldChangeCallbacks(prototype, instance, fieldName);
            Reflect.set(instance, (FIELD_DEFAULT_INITIALIZED + fieldName) as string, instance[fieldName]);
        }
    });
};

export const executeOnFieldChangeCallbacks = (prototype: any, instance: any, fieldName: string) => {

    const fieldChangeCallbacks: Array<FieldChangeCallbackRegistration> = getFieldChangeCallbacks(prototype);

    fieldChangeCallbacks.forEach(
        (fieldChangeCallbackRegistration: FieldChangeCallbackRegistration) => {

            if (fieldChangeCallbackRegistration.fieldName === fieldName) {
                instance[fieldChangeCallbackRegistration.methodName]();
            }
        });
};