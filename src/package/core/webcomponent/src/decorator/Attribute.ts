import {ComponentReflector} from "../../../di";
import {OBSERVED_ATTRIBUTES} from "../constant/OBSERVED_ATTRIBUTES";
import {getObservedAttributes} from "../function/getObservedAttributes";

export function Attribute(webComponentInstance: any, attributeName: string | symbol): any {

    ComponentReflector.addInitializer(webComponentInstance.constructor, (instance: any) => {

        let initial = true;
        const initialValue = instance[attributeName];
        Object.defineProperty(instance, attributeName, {
            set: (value: any) => {
                initial = false;
                return instance.setAttribute(attributeName, value);
            },
            get: (): any => {
                if (initial) {
                    initial = false;
                    return initialValue;
                }
                return instance.getAttributeReferencedValue(instance.getAttribute(attributeName));
            },
        });
    });

    const observedAttributes = getObservedAttributes(webComponentInstance.constructor);
    observedAttributes.push(attributeName);

    Reflect.set(webComponentInstance.constructor, OBSERVED_ATTRIBUTES, observedAttributes);
}