import {ObservedField} from "../reflector/prototype/observedField";
import {executeOnFieldChangeCallbacks, getField, setField} from "../reflector/instance/fields";

const FIELD_REGISTERED = "FIELD_REGISTERED_";

export const decorateFieldChange = (instance: any, prototype: any, observedFields: ObservedField[]) => {
    observedFields.forEach((observedField: ObservedField) => {
        const FieldName = observedField.name.toString();

        if (!Reflect.get(instance, (FIELD_REGISTERED + FieldName))) {

            Object.defineProperty(instance, FieldName, {
                // call: $webComponent.$Field = x
                set: (newValue: any) => {
                    setField(instance, FieldName, newValue);
                    executeOnFieldChangeCallbacks(prototype, instance, FieldName);
                    instance.flow();
                    return true;
                },
                get: (): any => getField(instance, FieldName),
            });

            Reflect.set(instance, (FIELD_REGISTERED + FieldName) as string, true);
        }
    });
};