import {getProvidedFieldConsumerListName} from "../function/getProvidedFieldConsumerListName";
import {addFieldChangeCallback} from "../function/addFieldChangeCallback";

export function Provide(webComponent: any,
                        fieldName?: string | symbol): any {

    const providedFieldConsumerListName = getProvidedFieldConsumerListName(fieldName!.toString());
    const providedFieldChangeCallbackName = `$onProvidedField_${fieldName!.toString()}_change`;

    if (!webComponent[providedFieldConsumerListName]) {
        webComponent[providedFieldConsumerListName] = [];
    }

    if (!webComponent[providedFieldChangeCallbackName]) {

        webComponent[providedFieldChangeCallbackName] = (propertyName: any, newValue: any) => {
            webComponent[providedFieldConsumerListName].forEach((notificationTarget: any) => {
                notificationTarget.instance[notificationTarget.fieldName][propertyName] = newValue;
            });
        };
        addFieldChangeCallback(webComponent, providedFieldChangeCallbackName, fieldName!.toString());
    }
}