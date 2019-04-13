import {executeOnAttributeChangeCallbacks, getAttribute, setAttribute} from "../reflector/instance/attributes";
import {ATTRIBUTE_TRANSFORM_FN_NAME} from "../..";

const ATTRIBUTE_REGISTERED = "ATTRIBUTE_REGISTERED_";

export const decorateTransparentAttributeGetterAndSetter = (instance: any, prototype: any, observedAttributes: Array<string>) => {
    observedAttributes.forEach((attributeName: string) => {

        if (!Reflect.get(instance, (ATTRIBUTE_REGISTERED + attributeName))) {

            const transformFn = Reflect.get(instance, ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString());

            Object.defineProperty(instance, attributeName, {
                // call: $webComponent.$attribute = x
                set: (newValue: any) => {

                    newValue = transformFn ? transformFn(newValue) : newValue;

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
};