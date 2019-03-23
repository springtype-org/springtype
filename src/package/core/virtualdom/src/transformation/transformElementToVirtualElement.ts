import {VirtualElement} from "../../index";

export const transformElementToVirtualElement = (element: Element): VirtualElement|string => {

    const virtualAttributes: { [attributeName: string]: any } = {};
    const virtualChildren: Array<VirtualElement|string> = [];

    if (element.nodeType !== Node.TEXT_NODE) {

        if (element.attributes) {

            const attributes: Array<Attr> = Array.from(element.attributes);

            for (let i=0; i<attributes.length; i++) {
                virtualAttributes[attributes[i].name] = attributes[i].value;
            }
        }

        if (element.childNodes) {

            for (let i=0; i<element.childNodes.length; i++) {
                virtualChildren.push(transformElementToVirtualElement(element.childNodes[i] as Element));
            }
        }

        return {
            name: element.tagName.toLowerCase(),
            attributes: virtualAttributes,
            children: virtualChildren
        }

    } else {
        return element.textContent || '';
    }
};