import {getObservedAttributes} from "../function/getObservedAttributes";
import {ComponentReflector} from "../../../di";
import {setObservedAttributes} from "../function/setObservedAttributes";
import {registerTransparentAttributeHooks} from "../function/registerTransparentAttributeHooks";
import {defaultInitializeTransparentAttributes} from "../function/defaultInitializeTransparentAttributes";
import {registerTransparentAttributeGetterAndSetter} from "../function/registerTransparentAttributeGetterAndSetter";
import {warn} from '../../../logger';

export function Attribute(webComponentInstance: any, attributeName: string | symbol): any {

    // test for uppercase characters
    if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName.toString())) {
        warn('The @Element', webComponentInstance.constructor, ' has an @Attribute with camelCase naming: ', attributeName, '. Use kebab-case instead!');
    }

    const observedAttributes = getObservedAttributes(webComponentInstance.constructor);
    observedAttributes.push(attributeName);
    setObservedAttributes(webComponentInstance.constructor, observedAttributes);

    ComponentReflector.addInitializer(webComponentInstance.constructor, (instance: any) => {

        defaultInitializeTransparentAttributes(instance, webComponentInstance.constructor, observedAttributes);

        registerTransparentAttributeGetterAndSetter(instance, webComponentInstance.constructor, observedAttributes);

        registerTransparentAttributeHooks(instance, observedAttributes);
    });
}