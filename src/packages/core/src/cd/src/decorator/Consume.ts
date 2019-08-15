import {ComponentReflector} from "../../../di";
import {getProvidedFieldConsumerListName} from "../function/getProvidedFieldConsumerListName";

export function Consume(targetProviderWebComponent: any,
                        fieldNameTarget?: string | symbol): any {

    return (webComponent: any, fieldName?: string | symbol) => {

        const providedAttributeConsumerListName = getProvidedFieldConsumerListName(fieldNameTarget!.toString());

        if (!targetProviderWebComponent.prototype[providedAttributeConsumerListName]) {
            console.error(ComponentReflector.getName(targetProviderWebComponent), 'has no @Provide decorated field', fieldNameTarget, 'but it is @Consume by', webComponent.constructor.name, '->', fieldNameTarget);
        }

        ComponentReflector.addInitializer(webComponent.constructor, (instance: any) => {

            if (targetProviderWebComponent.prototype[providedAttributeConsumerListName]) {
                targetProviderWebComponent.prototype[providedAttributeConsumerListName].push({
                    instance,
                    fieldName
                });
            }
        });
    };
}