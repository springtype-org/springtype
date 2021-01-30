import { IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeAttributes } from "./interface/ivirtual-node";
import { isJSXComment, tsxToStandardAttributeName } from "./render";
import { isPrimitive } from "../lang/is-primitive";
import { st } from "../st/st";
import { REF_ATTRIBUTE_NAME } from "./interface/iattributes";
import { IElement } from "./interface/ielement";

export const TEMPLATE_ELEMENT_NAME = "template";
export const DEFAULT_SLOT_NAME = "default";
export const FRAGMENT_ELEMENT_NAME = "fragment";
export const CLASS_ATTRIBUTE_NAME = "class";
export const STYLE_ATTRIBUTE_NAME = "style";
export const TABINDEX_ATTRIBUTE_NAME = "tabindex";
export const CLASS_NAME_ATTRIBUTE_NAME = "className";
export const XLINK_ATTRIBUTE_NAME = "xlink";
export const ID_ATTRIBUTE_NAME = "id";
export const LIST_KEY_ATTRIBUTE_NAME = "key";
export const DISABLED_ATTRIBUTE_NAME = "disabled";
export const ATTR_EVENT_LISTENER_PREFIX = "on";
export const ATTR_DEBUG_PREFIX = "__";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const STANDARD_HTML_PASS_ATTRIBUTES = [
    CLASS_ATTRIBUTE_NAME,
    STYLE_ATTRIBUTE_NAME,
    ID_ATTRIBUTE_NAME,
    TABINDEX_ATTRIBUTE_NAME,
    LIST_KEY_ATTRIBUTE_NAME,
    DISABLED_ATTRIBUTE_NAME
];

if (!st.dom) {

    st.domImpl = st.globalThis.window || {
        // TODO: Impl. compat document.* API 
    };

    // DOM abstraction layer for manipulation
    st.dom = {

        setDomImpl: (domImpl: Partial<Window>) => {
            st.domImpl = domImpl;
        },

        isReady: async (): Promise<void> => {
            // use DOM implementation provided instead of the globally infered one
            const document = st.domImpl!.document!;
            if (document.body) return Promise.resolve();
            return new Promise(resolve => document.addEventListener("DOMContentLoaded", () => resolve()));
        },

        hasElNamespace: (domElement: Element): boolean => {
            return domElement.namespaceURI === SVG_NAMESPACE;
        },

        hasSvgNamespace: (parentElement: Element, type: string): boolean => {
            return st.dom.hasElNamespace(parentElement) && type !== "STYLE" && type !== "SCRIPT";
        },

        createElementOrElements: (
            virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined | string>,
            parentDomElement: IElement,
            detached: boolean = false
        ): Array<IElement | Text | undefined> | IElement | Text | undefined => {

            if (Array.isArray(virtualNode)) {
                return st.dom.createChildElements(virtualNode, parentDomElement, detached);
            } else if (typeof virtualNode !== 'undefined') {
                return st.dom.createElement(virtualNode as IVirtualNode | undefined, parentDomElement, detached);
            } else {
                // undefined virtualNode -> e.g. when a tsx variable is used in markup which is undefined
                return st.dom.createTextNode("", parentDomElement, detached);
            }
        },

        getTagToUse: (virtualNode: IVirtualNode): string => {
            // support for <component tag="h1"> and <div tag="h2"> cases
            if (virtualNode.attributes && virtualNode.attributes.tag) {
                return virtualNode.attributes.tag;
            }
            return virtualNode.type;
        },

        createElement: (virtualNode: IVirtualNode, parentDomElement?: IElement): IElement | undefined => {
            let newEl: Element;

            // use DOM implementation provided instead of the globally infered one
            const document = st.domImpl!.document!;

            if (virtualNode.type.toUpperCase() === "SVG" || 
                (parentDomElement && st.dom.hasSvgNamespace(parentDomElement, virtualNode.type.toUpperCase()))) {
                newEl = document.createElementNS(SVG_NAMESPACE, virtualNode.type as string);
            } else {
                newEl = document.createElement(st.dom.getTagToUse(virtualNode) as string);
            }
            
            if (virtualNode.attributes) {
                st.dom.setAttributes(virtualNode.attributes, newEl);
            }

            if (virtualNode.children) {
                st.dom.createChildElements(virtualNode.children, newEl);
            }

            if (parentDomElement) {
                parentDomElement.appendChild(newEl);
            }
            return newEl as IElement;
        },

        replaceElement: (
            virtualNode: IVirtualNode | undefined,
            parentDomElement: Element,
            oldDomChildElement: Element
        ): IElement => {
            const domElement = st.dom.createElement(virtualNode, parentDomElement, true) as IElement;
            parentDomElement.replaceChild(domElement, oldDomChildElement);
            return domElement;
        },

        replaceTextNode: (
            virtualElementTextContent: string,
            parentDomElement: Element,
            oldDomChildElement: Element): Text => {
            const domElement = st.dom.createTextNode(virtualElementTextContent, parentDomElement, true);
            parentDomElement.replaceChild(domElement, oldDomChildElement);
            return domElement;
        },

        createTextNode: (text: string, domElement: IElement, detached: boolean = false): Text => {

            // use DOM implementation provided instead of the globally infered one
            const document = st.domImpl!.document!;
            const node = document.createTextNode(text.toString());

            if (!detached) {
                domElement.appendChild(node);
            }
            return node;
        },

        createChildElements: (
            virtualChildren: IVirtualChildren,
            domElement: IElement,
            detached: boolean = false): Array<IElement | Text | undefined> => {

            const children: Array<IElement | Text | undefined> = [];

            for (let virtualChild of virtualChildren as Array<IVirtualChild>) {
                if (isPrimitive(virtualChild)) {
                    children.push(st.dom.createTextNode(((typeof virtualChild === 'undefined' || virtualChild === null) ? "" : virtualChild!).toString(), domElement, detached));
                } else {
                    if (isJSXComment(virtualChild as IVirtualNode)) {
                        continue;
                    }
                    children.push(st.dom.createElement(virtualChild as IVirtualNode, domElement, detached));
                }
            }
            return children;
        },

        setAttribute: (name: string, value: any, domElement: IElement) => {

            // don't render debug attributes like __source and __self
            if (name.indexOf(ATTR_DEBUG_PREFIX) === 0) return;

            // attributes not set (undefined) are ignored; use null value to reset an attributes state
            if (typeof value === 'undefined') return;

            // save ref as { current: DOMElement } in ref object
            if (name === REF_ATTRIBUTE_NAME) {
                value.current = domElement;
                return;
            }

            if (name.startsWith(ATTR_EVENT_LISTENER_PREFIX) && typeof value === 'function') {
                let eventName = name.substring(2).toLowerCase();
                const capturePos = eventName.indexOf("capture");
                const doCapture = capturePos > -1;

                // onClickCapture={...} support
                if (doCapture) {
                    eventName = eventName.substring(0, capturePos);
                }
                domElement.addEventListener(eventName, value, doCapture);
                return;
            }

            // transforms class={['a', 'b']} into class="a b"
            if (name === CLASS_ATTRIBUTE_NAME && Array.isArray(value)) {
                value = value.join(" ");
            }

            if (st.dom.hasElNamespace(domElement) && name.startsWith(XLINK_ATTRIBUTE_NAME)) {
                domElement.setAttributeNS("http://www.w3.org/1999/xlink", tsxToStandardAttributeName(name), value);
            } else {

                if (name === STYLE_ATTRIBUTE_NAME && typeof value !== 'string') {
                    for (let prop in value) {
                        domElement.style[prop as any] = value[prop];
                    }
                } else {

                    if (typeof value === 'boolean') {
                        (domElement as any)[name] = value;
                    } else {
                        domElement.setAttribute(name, value);
                    }
                }
            }
        },

        isStandardHTMLAttribute: (name: string) => {
            // these attributes, set on a component (from the outside) will
            // always directly be set on component.el and the component will
            // not be notified using lifecycle methods
            // thus, these attribute names render pointless to be used
            // but this should be obvious too - just because of thier names nature
            return STANDARD_HTML_PASS_ATTRIBUTES.indexOf(name.toLowerCase()) > -1;
        },

        setAttributes: (
            attributes: IVirtualNodeAttributes,
            domElement: IElement,
            forceNative?: boolean,
        ) => {
            for (let name in attributes) {
                st.dom.setAttribute(name, attributes[name], domElement, forceNative);
            }
        },

        /**
         * Removes the DOM element provided from it's parent.
         */
        removeElement: (domElement: IElement) => {
            if (domElement.parentNode) {
                domElement.parentNode.removeChild(domElement);
            }
        },

        /**
         * Removes all children of a DOM element.
         * Behaves the same like element.innerHTML = '';
         */
        removeChildren: (domElement: IElement) => {
            while (domElement.firstChild) {
                domElement.removeChild(domElement.firstChild);
            }
        }
    };
}
