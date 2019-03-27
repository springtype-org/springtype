import {GET_ATTRIBUTE_METHOD_NAME} from "../constant/GET_ATTRIBUTE_METHOD_NAME";
import {ATTRIBUTE_VALUE} from "../constant/ATTRIBUTE_VALUE";
import {ATTRIBUTES_GETTER_NAME} from "../constant/ATTRIBUTES_GETTER_NAME";
import {TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED} from "../constant/TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED";

export const registerTransparentAttributeHooks = (instance: any, observedAttributes: Array<string>) => {

    // if transparent hooks are not yet registered for this @Attribute...
    if (!Reflect.get(instance, (TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED))) {

        // $webComponent.getAttribute(...) [native]
        const originalGetAttribute = instance[GET_ATTRIBUTE_METHOD_NAME].bind(instance);

        // replace $webComponent.getAttribute(...)
        instance[GET_ATTRIBUTE_METHOD_NAME] = (attributeName: string) => {

            // if attribute is not @Attribute observed, call native
            // $webComponent.getAttribute(...)
            if (observedAttributes.indexOf(attributeName) === -1) {
                return originalGetAttribute(attributeName);
            }

            // else return transparent value
            return Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName) as string);
        };

        // $webComponent.attributes [native]
        const originalAttributes = instance[ATTRIBUTES_GETTER_NAME];

        // replace $webComponent.attributes
        Object.defineProperty(instance, ATTRIBUTES_GETTER_NAME, {
            get: () => {

                // get all native $webComponent.attributes
                const attributes = originalAttributes;

                // enrich them with @Attribute added attributes
                observedAttributes.forEach((observedAttributeName: string) => {
                    attributes[observedAttributeName] = instance[observedAttributeName];
                });
                return attributes;
            }
        });

        Reflect.set(instance, (TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED) as string, true);
    }
};