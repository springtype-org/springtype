import {
    executeOnAttributeChangeCallbacks,
    getAttributeValue, getStAttributeModel,
    setAttributeChangeDetection, setAttributeValue
} from "../reflector/instance/attributes";
import {ObservedAttribute} from "../reflector/protoype/observedAttributes";


export const decorateTransparentAttributeGetterAndSetter = (instance: any, prototype: any, observedAttributes: ObservedAttribute[]) => {
    observedAttributes.forEach((observedAttribute: ObservedAttribute) => {
        const attributeName = observedAttribute.name.toString();

        if (!getStAttributeModel(instance, attributeName).changeDetection) {
            Object.defineProperty(instance, attributeName, {
                // call: $webComponent.$attribute = x
                set: (newValue: any) => {
                    const oldValue = instance[attributeName];
                    let changeCancelled = false;
                    if (instance.onBeforeAttributeChange) {
                        changeCancelled = instance.onBeforeAttributeChange(attributeName, oldValue, newValue);
                    }
                    if (!changeCancelled) {
                        setAttributeValue(instance, attributeName, newValue);
                        executeOnAttributeChangeCallbacks(prototype, instance, attributeName);
                        instance.flowOnAttributeChange(attributeName, oldValue, newValue);
                    }
                    return true;
                },
                // call: let y = $webComponent.$attribute
                get: (): any => getAttributeValue(instance, attributeName),
            });

            setAttributeChangeDetection(instance, attributeName);
        }
    });
};
