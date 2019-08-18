import {ObservedField} from "../prototype/observedField";
import {getFieldChangeCallbacks} from "../fieldChangeCallbacks";
import {FieldChangeCallbackRegistration} from "../../interface/FieldChangeCallbackRegistration";

const ST_FIELD = "ST_FIELD";

interface StFieldModel {
    initValue?: any;
    value?: any;
    changeDetection?: boolean;
}

const getStFields = (instance: any): { [key: string]: StFieldModel; } =>
    Reflect.get(instance, ST_FIELD) || {};

export const getFieldValue = (instance: any, attributeName: string) =>
    getStFields(instance)[attributeName].value;

export const getStFieldModel = (instance: any, attributeName: string) =>
    getStFields(instance)[attributeName];

export const setFieldValue = (instance: any, attributeName: string, value: any) => {
    let fields: { [key: string]: StFieldModel; } = getStFields(instance);
    fields[attributeName].value = value;
    Reflect.set(instance, ST_FIELD, fields);
};
export const setFieldChangeDetection = (instance: any, attributeName: string) => {
    let fields: { [key: string]: StFieldModel; } = getStFields(instance);
    fields[attributeName].changeDetection = true;
    Reflect.set(instance, ST_FIELD, fields);
};

export const setFieldInit = (instance: any, attributeName: string, initValue: any) => {
    let fields: { [key: string]: StFieldModel; } = getStFields(instance);
    fields[attributeName] = {initValue: initValue, value: initValue};
    Reflect.set(instance, ST_FIELD, fields);
};

export const initializeField = (instance: any, prototype: any, observedField: ObservedField[]) => {
    // set default field values (initial)
    observedField.forEach((observedField: ObservedField) => {
        const fieldName = observedField.name.toString();

        if (!getStFields(instance)[fieldName]) {
            setFieldInit(instance, fieldName, instance[fieldName]);
            executeOnFieldChangeCallbacks(prototype, instance, fieldName);
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