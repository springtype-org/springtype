import {registerForChangeDetection} from "../function/registerForChangeDetection";
import {FieldChangeCallbackRegistration} from "../interface/FieldChangeCallbackRegistration";
import {getOnFieldChangeCallbacks} from "../reflector/fieldChangeCallbacks";

export function Field(
    webComponentInstance: any,
    fieldName: string | symbol
): any {

    registerForChangeDetection(webComponentInstance.constructor, fieldName, false,
        (props: any, propName: string|number|symbol, value: any, instance: any) => {

        const onFieldChangeCallbacks: Array<FieldChangeCallbackRegistration> =
            getOnFieldChangeCallbacks(webComponentInstance.constructor);

        onFieldChangeCallbacks.forEach((onFieldChangeCallbackRegistration: FieldChangeCallbackRegistration) => {

            if (fieldName === onFieldChangeCallbackRegistration.fieldName) {
                instance[onFieldChangeCallbackRegistration.methodName](propName, value);
    }
        })
    });
}