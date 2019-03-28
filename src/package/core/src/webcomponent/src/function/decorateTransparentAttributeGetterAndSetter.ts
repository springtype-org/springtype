import {executeOnAttributeChangeCallbacks, getAttribute, setAttribute} from "../reflector/instance/attributes";

const ATTRIBUTE_REGISTERED = "ATTRIBUTE_REGISTERED_";

export const decorateTransparentAttributeGetterAndSetter = (instance: any, prototype: any, observedAttributes: Array<string>) => {
    observedAttributes.forEach((attributeName: string) => {

        if (!Reflect.get(instance, (ATTRIBUTE_REGISTERED + attributeName))) {

            Object.defineProperty(instance, attributeName, {
                // call: $webComponent.$attribute = x
                set: (newValue: any) => {

                    const oldValue = instance[attributeName];
                    let changeCancelled = false;

                    if (instance.onBeforeAttributeChange) {
                        changeCancelled = instance.onBeforeAttributeChange(attributeName, oldValue, newValue);
                    }

                    if (!changeCancelled) {

                        setAttribute(instance, attributeName, newValue);

                        executeOnAttributeChangeCallbacks(prototype, instance, attributeName);

                        instance.flowOnAttributeChange(attributeName, oldValue, newValue);
                    }
                    return true;
                },
                // call: let y = $webComponent.$attribute
                get: (): any => getAttribute(instance, attributeName),
            });

            Reflect.set(instance, (ATTRIBUTE_REGISTERED + attributeName) as string, true);
        }
    });
}