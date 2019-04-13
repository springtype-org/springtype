import {ComponentReflector} from "../../../di";
import {decorateTransparentAttributeGetterAndSetter} from "../function/decorateTransparentAttributeGetterAndSetter";
import {warn} from '../../../logger';
import {getObservedAttributes, setObservedAttributes} from "../reflector/protoype/observedAttributes";
import {initializeAttributes, registerAttributeHooks} from "../reflector/instance/attributes";
import {AttributeType, transformBooleanDOMAttributeValue, transformFloatDOMAttributeValue, transformIntDOMAttributeValue} from "../..";
import {DOMAttributeValueTransformer} from "../interface/DOMAttributeValueTransformer";

export const ATTRIBUTE_TRANSFORM_FN_NAME = 'ATTR_TRANSFORM_FN';

export function Attribute(webComponentInstanceOrTransformFnOrAttributeType: AttributeType|DOMAttributeValueTransformer|any,
                          attributeName?: string | symbol): any {

    const setup = (webComponentInstance: any, attributeName?: string | symbol, webComponentInstanceOrTransformFnOrAttributeType?: any) => {

        let transformFn;

        // test for uppercase characters
        if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName!.toString())) {
            warn(
                'The @Element', webComponentInstance.constructor,
                ' has an @Attribute with camelCase naming: ', attributeName, '. Use kebab-case instead!');
        }

        if (typeof webComponentInstanceOrTransformFnOrAttributeType === 'string') {

            switch(webComponentInstanceOrTransformFnOrAttributeType) {

                case AttributeType.BOOLEAN:
                    transformFn = transformBooleanDOMAttributeValue;
                    break;

                case AttributeType.FLOAT:
                    transformFn = transformFloatDOMAttributeValue;
                    break;

                case AttributeType.INT:
                    transformFn = transformIntDOMAttributeValue;
                    break;
            }

        } else if (typeof webComponentInstanceOrTransformFnOrAttributeType === 'function') {

            transformFn = webComponentInstanceOrTransformFnOrAttributeType;

        } else if (typeof webComponentInstanceOrTransformFnOrAttributeType !== 'undefined') {

            warn(
                'The @Element', webComponentInstance.constructor,
                ' has an @Attribute(attributeTypeOrTransformFn) with an invalid AttributeType / no transform function: ',
                attributeName, ' value cannot be transformed by: ', webComponentInstanceOrTransformFnOrAttributeType
            );
        }

        const observedAttributes = getObservedAttributes(webComponentInstance.constructor);
        observedAttributes.push(attributeName);

        if (transformFn) {
            Reflect.set(webComponentInstance, ATTRIBUTE_TRANSFORM_FN_NAME + attributeName!.toString(), transformFn);
        }

        setObservedAttributes(webComponentInstance.constructor, observedAttributes);

        ComponentReflector.addInitializer(webComponentInstance.constructor, (instance: any) => {

            initializeAttributes(instance, webComponentInstance.constructor, observedAttributes);

            decorateTransparentAttributeGetterAndSetter(instance, webComponentInstance.constructor, observedAttributes);

            registerAttributeHooks(instance, observedAttributes);
        });
    };

    if (webComponentInstanceOrTransformFnOrAttributeType instanceof HTMLElement) {

        setup(webComponentInstanceOrTransformFnOrAttributeType, attributeName);

    } else {

        return (webComponentInstance: any, attributeName?: string | symbol) => {
            setup(webComponentInstance, attributeName, webComponentInstanceOrTransformFnOrAttributeType);
        };
    }
}