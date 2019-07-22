import {ComponentReflector} from "../../../di";
import {decorateTransparentAttributeGetterAndSetter} from "../function/decorateTransparentAttributeGetterAndSetter";
import {warn} from '../../../logger';
import {getObservedAttributes, setObservedAttributes} from "../reflector/protoype/observedAttributes";
import {initializeAttributes, registerAttributeHooks} from "../reflector/instance/attributes";

export function Attribute(webComponentInstance: any, attributeName?: string | symbol): any {

    const setup = (webComponentInstance: any, attributeName?: string | symbol) => {
        // test for uppercase characters
        if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName!.toString())) {
            warn(
                'The @WebComponent', webComponentInstance.constructor,
                ' has an @Attribute with camelCase naming: ', attributeName, '. Use kebab-case instead!');
        }

        const observedAttributes = getObservedAttributes(webComponentInstance.constructor);
        const attributeType = Reflect.getMetadata("design:type", webComponentInstance, attributeName!.toString());
        observedAttributes.push({name: attributeName!.toString(), type: attributeType.name});

        setObservedAttributes(webComponentInstance.constructor, observedAttributes);

        ComponentReflector.addInitializer(webComponentInstance.constructor, (instance: any) => {

            initializeAttributes(instance, webComponentInstance.constructor, observedAttributes);

            decorateTransparentAttributeGetterAndSetter(instance, webComponentInstance.constructor, observedAttributes);

            registerAttributeHooks(instance, observedAttributes);
        });

    };

    if (webComponentInstance instanceof HTMLElement) {

        setup(webComponentInstance, attributeName);

    } else {

        return (webComponentInstance: any, attributeName?: string | symbol) => {
            setup(webComponentInstance, attributeName);
        };
    }
}