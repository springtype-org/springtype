import {ObservedField} from "../reflector/prototype/observedField";
import {
    executeOnFieldChangeCallbacks,
    getFieldValue,
    getStFieldModel,
    setFieldValue,
    setFieldChangeDetection
} from "../reflector/instance/fields";


export const decorateFieldChange = (instance: any, prototype: any, observedFields: ObservedField[]) => {
    observedFields.forEach((observedField: ObservedField) => {
        const fieldName = observedField.name.toString();

        if (!getStFieldModel(instance,fieldName).cd) {

            Object.defineProperty(instance, fieldName, {
                // call: $webComponent.$Field = x
                set: (newValue: any) => {
                    setFieldValue(instance, fieldName, newValue);
                    executeOnFieldChangeCallbacks(prototype, instance, fieldName);
                    instance.flow();
                    return true;
                },
                get: (): any => getFieldValue(instance, fieldName),
            });

            setFieldChangeDetection(instance,fieldName)
        }
    });
};