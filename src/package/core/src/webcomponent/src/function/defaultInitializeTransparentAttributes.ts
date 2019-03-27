import {TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED} from "../constant/TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED";
import {executeOnAttributeChangeCallbacks} from "./executeOnAttributeChangeCallbacks";
import {setTransparentAttribute} from "./setTransparentAttribute";

export const defaultInitializeTransparentAttributes = (instance: any, prototype: any, observedAttributes: Array<string>) => {
    // set default attribute values (initial)
    observedAttributes.forEach((attributeName: string) => {

        if (!Reflect.get(instance, (TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED + attributeName))) {

            setTransparentAttribute(instance, attributeName, instance[attributeName]);
            executeOnAttributeChangeCallbacks(prototype, instance, attributeName);

            Reflect.set(instance, (TRANSPARENT_ATTRIBUTE_DEFAULT_INITIALIZED + attributeName) as string, true);
        }
    });
}