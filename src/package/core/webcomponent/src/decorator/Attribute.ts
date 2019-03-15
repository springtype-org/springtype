import {getObservedAttributes} from "../function/getObservedAttributes";
import {ComponentReflector} from "../../../di";
import {setObservedAttributes} from "../function/setObservedAttributes";
import {registerTransparentAttributeHooks} from "../function/registerTransparentAttributeHooks";
import {defaultInitializeTransparentAttributes} from "../function/defaultInitializeTransparentAttributes";
import {registerTransparentAttributeGetterAndSetter} from "../function/registerTransparentAttributeGetterAndSetter";

export function Attribute(webComponentInstance: any, attributeName: string | symbol): any {

    const observedAttributes = getObservedAttributes(webComponentInstance.constructor);
    observedAttributes.push(attributeName);
    setObservedAttributes(webComponentInstance.constructor, observedAttributes);


    ComponentReflector.addInitializer(webComponentInstance.constructor, (instance: any) => {

        defaultInitializeTransparentAttributes(instance, webComponentInstance.constructor, observedAttributes);

        registerTransparentAttributeGetterAndSetter(instance, webComponentInstance.constructor, observedAttributes);

        registerTransparentAttributeHooks(instance, observedAttributes);
    });
}