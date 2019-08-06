import {ComponentReflector} from "../../../di";
import {getObservedFields, setObservedFields} from "../reflector/prototype/observedField";
import {initializeField} from "../reflector/instance/fields";
import {decorateFieldChange} from "../function/decorateFieldChange";

export function Field(
    webComponentInstance: any,
    fieldName: string | symbol
): any {


    const setup = (webComponentInstance: any, fieldName?: string | symbol) => {

        const observedFields = getObservedFields(webComponentInstance.constructor);

        observedFields.push({name: fieldName!});

        setObservedFields(webComponentInstance.constructor, observedFields);

        ComponentReflector.addInitializer(webComponentInstance.constructor, (instance: any) => {

            initializeField(instance, webComponentInstance.constructor, observedFields);

            decorateFieldChange(instance, webComponentInstance.constructor, observedFields);

        });

    };

    if (webComponentInstance instanceof HTMLElement) {

        setup(webComponentInstance, fieldName);

    } else {

        return (webComponentInstance: any, fieldName?: string | symbol) => {
            setup(webComponentInstance, fieldName);
        };
    }
}