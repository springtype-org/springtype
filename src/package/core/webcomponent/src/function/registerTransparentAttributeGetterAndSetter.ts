import {ATTRIBUTE_REGISTERED} from "../constant/ATTRIBUTE_REGISTERED";
import {executeOnAttributeChangeCallbacks} from "./executeOnAttributeChangeCallbacks";
import {setTransparentAttribute} from "./setTransparentAttribute";
import {getTransparentAttribute} from "./getTransparentAttribute";

export const registerTransparentAttributeGetterAndSetter = (instance: any, prototype: any, observedAttributes: Array<string>) => {
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

                        setTransparentAttribute(instance, attributeName, newValue);

                        executeOnAttributeChangeCallbacks(prototype, instance, attributeName);

                        instance.reflowOnAttributeChange(attributeName, oldValue, newValue);
                    }
                    return true;
                },
                // call: let y = $webComponent.$attribute
                get: (): any => getTransparentAttribute(instance, attributeName),
            });

            Reflect.set(instance, (ATTRIBUTE_REGISTERED + attributeName) as string, true);
        }
    });
}