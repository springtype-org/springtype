import {warn} from "../../../logger";
import {FRAGMENT_ELEMENT_TAG_NAME, VirtualElement} from "../../index";
import {measureSpeed} from "../../../lang";

export class VirtualDOMTransformer {

    static transformVirtualElementAttributes = (virtualElement: VirtualElement) => {

        // transform attributes
        if (virtualElement.attributes) {

            const mutatedAttributes: {
                [attributeName: string]: any;
            } = {};

            for (let attributeName in virtualElement.attributes) {

                if (virtualElement.attributes.hasOwnProperty(attributeName)) {

                    let mutatedAttributeName = attributeName;

                    // 1. Transform React className -> class
                    if (attributeName.toLowerCase() === 'classname') {
                        mutatedAttributeName = 'class';
                    }

                    mutatedAttributes[mutatedAttributeName] =
                        virtualElement.attributes[attributeName];
                }

            }
            virtualElement.attributes = mutatedAttributes;
        }
    };

    static transformVirtualElementList = (parent: VirtualElement, childrenDestination: Array<VirtualElement|string>, list: Array<VirtualElement|string>) => {

        for (let i=0; i<list.length; i++) {

            if (typeof list[i] !== 'string' &&
                (!(list[i] as VirtualElement).attributes || typeof (list[i] as VirtualElement).attributes.key === 'undefined')) {
                warn('The element ', parent, ' is a list (Array). Each entry in a list must have an unique "key" attribute like: key="$index". But ', list[i], 'is missing it.');
            }

            childrenDestination.push(list[i]);
        }
    };

    static transformVirtualElementTree = measureSpeed('transformVirtualElementTree', (virtualElement: VirtualElement|string): VirtualElement|string => {

        if (typeof virtualElement === 'object') {

            VirtualDOMTransformer.transformVirtualElementAttributes(virtualElement);

            // make sure it's a true VirtualElement, not a text node and has children to walk thru
            if (virtualElement && virtualElement.children) {

                const nonFragmentChildren = [];

                // 1. Filter / aggregate elements that are not <st-fragment>'s
                for (let i=0; i<virtualElement.children.length; i++) {

                    const virtualElementChild = VirtualDOMTransformer.transformVirtualElementTree(
                        virtualElement.children[i]
                    ) as VirtualElement;

                    if (typeof virtualElementChild === 'object') {

                        if (virtualElementChild.name === FRAGMENT_ELEMENT_TAG_NAME &&
                            virtualElementChild.children && virtualElementChild.children.length) {

                            for (let j=0; j<virtualElementChild.children.length; j++) {

                                // TODO: abstract logic
                                // flatten lists
                                if (Array.isArray(virtualElementChild.children[j])) {

                                    VirtualDOMTransformer.transformVirtualElementList(
                                        virtualElement, nonFragmentChildren, virtualElementChild.children[j]
                                    );

                                } else {

                                    nonFragmentChildren.push(
                                        VirtualDOMTransformer.transformVirtualElementTree(virtualElementChild.children[j])
                                    );
                                }
                            }

                        } else {

                            // flatten lists
                            if (Array.isArray(virtualElementChild)) {

                                VirtualDOMTransformer.transformVirtualElementList(
                                    virtualElement, nonFragmentChildren, virtualElementChild
                                );

                            } else {

                                nonFragmentChildren.push(virtualElementChild);
                            }
                        }
                    } else {
                        nonFragmentChildren.push(virtualElementChild);
                    }
                }
                virtualElement.children = nonFragmentChildren;
            }
        }
        return virtualElement;
    });
}