import {st} from "../../core";
import {isPrimitive} from "../../core/lang/is-primitive";
import {GlobalCache} from "../../core/st/interface/i$st";
import {IComponentOptions, ILifecycle} from "../component/interface";
import {Component} from "../component"
import {IElement} from "./interface";
import {IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeAttributes} from "./interface/ivirtual-node";
import {isJSXComment, tsxToStandardAttributeName} from "./tsx";
import {REF_ATTRIBUTE_NAME} from "./interface/iattributes";
import {TYPE_FUNCTION} from "../../core/lang/type-function";
import {TYPE_STRING} from "../../core/lang/type-string";
import {TYPE_BOOLEAN} from "../../core/lang/type-boolean";
import {cloneObject} from "../../core/lang/immute";
import {TYPE_UNDEFINED} from "../../core/lang/type-undefined";
import {AttrTrait, AttrType} from "../component/trait/attr";

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
export const ATTR_EVENT_LISTENER_PREFIX = "on";
export const ATTR_DEBUG_PREFIX = "__";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const STANDARD_HTML_PASS_ATTRIBUTES = [CLASS_ATTRIBUTE_NAME, STYLE_ATTRIBUTE_NAME, ID_ATTRIBUTE_NAME, TABINDEX_ATTRIBUTE_NAME, LIST_KEY_ATTRIBUTE_NAME];

if (!st.dom) {

    // DOM abstraction layer for manipulation
    st.dom = {

        isReady: async (): Promise<void> => {
            if (document.body) return Promise.resolve();
            return new Promise(resolve => document.addEventListener("DOMContentLoaded", () => resolve()));
        },

        hasElNamespace: (domElement: Element): boolean => {
            return domElement.namespaceURI === SVG_NAMESPACE;
        },

        hasSvgNamespace: (parentElement: Element, type: string): boolean => {
            return st.dom.hasElNamespace(parentElement) && type !== "STYLE" && type !== "SCRIPT";
        },

        isRegisteredComponent: (tagName: string): boolean => !!st[GlobalCache.COMPONENT_REGISTRY][tagName],

        createElementOrElements: (
            virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined | string>,
            parentDomElement: IElement,
            detached: boolean = false
        ): Array<IElement | Text | undefined> | IElement | Text | undefined => {

            if (Array.isArray(virtualNode)) {
                return st.dom.createChildElements(virtualNode, parentDomElement, detached);
            } else if (typeof virtualNode != TYPE_UNDEFINED) {
                return st.dom.createElement(virtualNode as IVirtualNode | undefined, parentDomElement, detached);
            } else {
                // undefined virtualNode -> e.g. when a tsx variable is used in markup which is undefined
                return st.dom.createTextNode("", parentDomElement, detached);
            }
        },

        createComponentInstance: (virtualNode: IVirtualNode, parentDomElement: IElement) => {
            // Refactor: exclude
            let component;
            let componentCtor = st.getComponent(virtualNode.type) as any;

            if (!componentCtor) return {};

            const outerAttributes: any = cloneObject(virtualNode.attributes, false);

            // identified virtual component
            // functional component
            if (!componentCtor.name) {

                const fn = componentCtor as Function & {
                    COMPONENT_OPTIONS: IComponentOptions;
                };

                // create shallow component instance
                component = new Component();

                // assign options
                component.INTERNAL.options = fn.COMPONENT_OPTIONS;

                // execute function and assign render method
                component.render = fn(component);

            } else {


                // class API
                // create instance of component
                component = new componentCtor();

                if (process.env.NODE_ENV == 'development') {
                    if (!(component instanceof st.component)) {
                        st.error(`Class ${componentCtor.name} does not extend from st.component!`);
                    }
                }
            }

            // set root DOM node ref and parent ref
            component.parent = parentDomElement.$stComponentRef;

            // assign attributes, slotChildren etc.
            component.virtualNode = virtualNode;

            if (component.parent) {
                if (!component.parent.childComponents) {
                    component.parent.childComponents = [];
                }
                component.parent.childComponents.push(component);
            }

            for (let propName in component) {

                // undefined early return
                if (typeof component[propName] == TYPE_UNDEFINED) continue;

                if (propName.startsWith(ATTR_EVENT_LISTENER_PREFIX) &&
                    typeof component[propName] == TYPE_FUNCTION) {

                    // component-local bould event listener function
                    if (!virtualNode.attributes) {
                        virtualNode.attributes = {};
                    }

                    if (outerAttributes[propName]) {

                        const outsideEventListener = outerAttributes[propName];
                        const localEventListener = component[propName];

                        virtualNode.attributes[propName] = (evt: Event) => {
                            localEventListener(evt);
                            outsideEventListener(evt);
                        }
                    } else {
                        virtualNode.attributes[propName] = component[propName]
                    }
                }
            }

            // to analyze, filter and transform before create
            component.onBeforeElCreate(virtualNode);

            return {
                component,
                componentCtor,
                outerAttributes
            }
        },

        updateComponentAttributes: (component: any, outerAttributes: any, virtualNode: IVirtualNode) => {

            // any internal  @attr(AttrType.DOM_TRANSPARENT) foo = 123; or outer foo={123} handling
            for (let attrName in component.INTERNAL.attributes) {

                if (AttrTrait.getType(component, attrName) == AttrType.DOM_TRANSPARENT) {
                    const value = outerAttributes[attrName] || component.INTERNAL.attributes[attrName];

                    virtualNode.attributes[attrName] = value;

                    // update as a decision
                    component.INTERNAL.attributes[attrName] = value;
                }
            }

            const id = outerAttributes[ID_ATTRIBUTE_NAME] || component.INTERNAL[ID_ATTRIBUTE_NAME];
            if (id) {
                virtualNode.attributes[ID_ATTRIBUTE_NAME] = id;

                // update as a decision
                component.INTERNAL[ID_ATTRIBUTE_NAME] = id;
            }
            const key = outerAttributes[LIST_KEY_ATTRIBUTE_NAME] || component.INTERNAL[LIST_KEY_ATTRIBUTE_NAME];

            if (key) {
                virtualNode.attributes[LIST_KEY_ATTRIBUTE_NAME] = key;

                // update as a decision
                component.INTERNAL[LIST_KEY_ATTRIBUTE_NAME] = key;
            }

            const tabIndex = outerAttributes[TABINDEX_ATTRIBUTE_NAME] || component.INTERNAL[TABINDEX_ATTRIBUTE_NAME];
            if (tabIndex) {
                virtualNode.attributes[TABINDEX_ATTRIBUTE_NAME] = tabIndex;

                // update as a decision
                component.INTERNAL[TABINDEX_ATTRIBUTE_NAME] = tabIndex;
            }
        },

        getTagToUse: (component: ILifecycle, virtualNode: IVirtualNode): string => {

            if (component) {
                const componentCtor = Object.getPrototypeOf(component).constructor;
                if ((component as any).tag || componentCtor.COMPONENT_OPTIONS && componentCtor.COMPONENT_OPTIONS.tag) {
                    // use <class-name> instead of ClassName which would end up as <classname> in DOM
                    return (component as any).tag || componentCtor.COMPONENT_OPTIONS.tag;
                }
            }

            // support for <component tag="h1"> and <div tag="h2"> cases
            if (virtualNode.attributes && virtualNode.attributes.tag) {
                return virtualNode.attributes.tag;
            }
            return virtualNode.type;
        },

        createElement: (virtualNode: IVirtualNode, parentDomElement: IElement, detached: boolean = false): IElement | undefined => {
            let newEl: Element;

            const {component, outerAttributes} = st.dom.createComponentInstance(virtualNode, parentDomElement);

            if (virtualNode.type.toUpperCase() === "SVG" || st.dom.hasSvgNamespace(parentDomElement, virtualNode.type.toUpperCase())) {
                newEl = document.createElementNS(SVG_NAMESPACE, virtualNode.type as string);
            } else {
                newEl = document.createElement(st.dom.getTagToUse(component as ILifecycle, virtualNode) as string);
            }

            if (component) {

                // set element reference
                component.el = newEl;

                // reference component logical controller component
                (newEl as IElement).$stComponent = component;
                (newEl as IElement).$stComponentRef = component;
                (newEl as IElement).getComponent = function () {
                    return this.$stComponent || this.$stComponentRef
                };

                st.dom.updateComponentAttributes(component, outerAttributes, virtualNode);

            } else {
                // passing down parent component reference (it's a pure DOM element in this case)
                (newEl as IElement).$stComponentRef = parentDomElement.$stComponentRef;
                (newEl as IElement).getComponent = function () {
                    return this.$stComponentRef
                };
            }

            if (virtualNode.attributes) {
                st.dom.setAttributes(virtualNode.attributes, newEl);
            }

            if (component) {
                // to verify and mutate further
                component.onAfterElCreate!(newEl);
                component.onBeforeElChildrenCreate!();
            }

            if (virtualNode.children) {
                st.dom.createChildElements(virtualNode.children, newEl);
            }

            if (component) {
                component.onAfterElChildrenCreate!();
                component.onBeforeConnect!();
            }

            if (!detached) {
                parentDomElement.appendChild(newEl);

                if (component) {
                    component.connectedCallback!();
                }
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
                    children.push(st.dom.createTextNode(((typeof virtualChild == TYPE_UNDEFINED || virtualChild === null) ? "" : virtualChild!).toString(), domElement, detached));
                } else {
                    if (isJSXComment(virtualChild as IVirtualNode)) {
                        continue;
                    }
                    children.push(st.dom.createElement(virtualChild as IVirtualNode, domElement, detached));
                }
            }
            return children;
        },

        setAttribute: (name: string, value: any, domElement: IElement, forceNative?: boolean) => {
            // don't render debug attributes like __source and __self
            if (name.indexOf(ATTR_DEBUG_PREFIX) === 0) return;

            // stores referenced DOM nodes in a memory efficient WeakMap
            // for access from CustomElements
            if (name === REF_ATTRIBUTE_NAME) {
                const refName = Object.keys(value)[0];

                if (!domElement.$stComponentRef.INTERNAL.refs) {
                    domElement.$stComponentRef.INTERNAL.refs = {};
                }

                const refValue = domElement.$stComponent || domElement;

                // remember for destruction on disconnect
                domElement.$stComponentRef.INTERNAL.refs[refName] = refValue;

                let refMutation = false;

                if (value[refName][refName]) {
                    refMutation = true;
                }

                Object.defineProperty(value[refName], refName, {
                    value: refValue,
                    configurable: true,
                });

                if (refMutation) {
                    value[refName].onAfterRefChange(refName, refValue);
                }
                return;
            }

            if (name.startsWith(ATTR_EVENT_LISTENER_PREFIX) && typeof value == TYPE_FUNCTION) {
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
                if (domElement.$stComponent && !st.dom.isStandardHTMLAttribute(name) && forceNative !== true) {
                    domElement.$stComponent.setAttribute(name, value);
                } else if (name === STYLE_ATTRIBUTE_NAME && typeof value !== TYPE_STRING) {
                    for (let prop in value) {
                        domElement.style[prop as any] = value[prop];
                    }
                } else {
                    if (typeof value == TYPE_BOOLEAN) {
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
    };
}
