import { IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeAttributes } from "./interface/ivirtual-node";
import { isJSXComment, tsxToStandardAttributeName } from "./tsx";
import { isPrimitive } from "../lang/is-primitive";
import { st, ST_KEY } from "../st/st";
import { REF_ATTRIBUTE_NAME } from "./interface/iattributes";
import { IElement } from "./interface/ielement";
import { ATTR_DEBUG_PREFIX, CLASS_ATTRIBUTE_NAME, STYLE_ATTRIBUTE_NAME, XLINK_ATTRIBUTE_NAME } from "./constants";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

if (!st.dom) {

    st.domImpl = st.globalThis.window || {
        // TODO: Impl. compat document.* API 
    };

    // DOM abstraction layer for manipulation
    st.dom = {

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
            parentDomElement?: IElement
        ): Array<IElement | Text | undefined> | IElement | Text | undefined => {

            if (Array.isArray(virtualNode)) {
                return st.dom.createChildElements(virtualNode, parentDomElement);
            } else if (typeof virtualNode !== 'undefined') {
                return st.dom.createElement(virtualNode as IVirtualNode | undefined, parentDomElement);
            } else {
                // undefined virtualNode -> e.g. when a tsx variable is used in markup which is undefined
                return st.dom.createTextNode("", parentDomElement);
            }
        },

        createElement: (virtualNode: IVirtualNode, parentDomElement?: IElement): IElement | undefined => {
            let newEl: Element;

            // use DOM implementation provided instead of the globally infered one
            const document = st.domImpl!.document!;

            if (virtualNode.type.toUpperCase() === "SVG" || 
                (parentDomElement && st.dom.hasSvgNamespace(parentDomElement, virtualNode.type.toUpperCase()))) {
                newEl = document.createElementNS(SVG_NAMESPACE, virtualNode.type as string);
            } else {
                newEl = document.createElement(virtualNode.type as string);
            }

            // reference SpringType as a reference to every element created
            // this allows microframework addition libs like st-query to re-use this instance
            // with the correct domImpl the element belongs to
            (newEl as any)[ST_KEY] = st;
            
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

        createTextNode: (text: string, domElement?: IElement): Text => {

            // use DOM implementation provided instead of the globally infered one
            const document = st.domImpl!.document!;
            const node = document.createTextNode(text.toString());

            if (domElement) {
                domElement.appendChild(node);
            }
            return node;
        },

        createChildElements: (
            virtualChildren: IVirtualChildren,
            domElement?: IElement): Array<IElement | Text | undefined> => {

            const children: Array<IElement | Text | undefined> = [];

            for (let virtualChild of virtualChildren as Array<IVirtualChild>) {
                if (isPrimitive(virtualChild)) {
                    children.push(st.dom.createTextNode(((typeof virtualChild === 'undefined' || virtualChild === null) ? "" : virtualChild!).toString(), domElement));
                } else {
                    if (isJSXComment(virtualChild as IVirtualNode)) {
                        continue;
                    }
                    children.push(st.dom.createElement(virtualChild as IVirtualNode, domElement));
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

            if (name.startsWith("on") && typeof value === 'function') {
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

        setAttributes: (
            attributes: IVirtualNodeAttributes,
            domElement: IElement,
            forceNative?: boolean,
        ) => {
            for (let name in attributes) {
                st.dom.setAttribute(name, attributes[name], domElement, forceNative);
            }
        }
    };
}