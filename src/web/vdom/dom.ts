import { st } from "../../core";
import { isPrimitive } from "../../core/lang/is-primitive";
import { GlobalCache } from "./../../core/st/interface/i$st";
import { IComponentOptions } from "./../component/interface/icomponent-options";
import { Component } from "./../component/component"
import { IElement } from "./interface/ielement";
import { IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeAttributes } from "./interface/ivirtual-node";
import { isJSXComment, tsxToStandardAttributeName, CLASS_ATTRIBUTE_NAME, XLINK_ATTRIBUTE_NAME } from "./tsx";
import { REF_ATTRIBUTE_NAME } from "./interface/iattributes";
import { TYPE_FUNCTION } from "../../core/lang/type-function";
import { TYPE_STRING } from "../../core/lang/type-string";
import { TYPE_BOOLEAN } from "../../core/lang/type-boolean";

export const LIST_KEY_ATTRIBUTE_NAME = "key";
export const ATTR_EVENT_LISTENER_PREFIX = "on";
export const ATTR_DEBUG_PREFIX = "__";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
if (!st.dom) {

  // DOM abstraction layer for manipulation
  st.dom = {

    isReady: async (): Promise<void> => {
      if (document.body) Promise.resolve();
      return new Promise(resolve => document.addEventListener("DOMContentLoaded", () => resolve()));
    },
    hasElNamespace: (domElement: Element): boolean => {
      return domElement.namespaceURI === SVG_NAMESPACE;
    },

    hasSvgNamespace: (parentElement: Element, type: string): boolean => {
      return st.dom.hasElNamespace(parentElement) && type !== "STYLE" && type !== "SCRIPT";
    },

    isRegisteredComponent: (tagName: string): boolean => !!st[GlobalCache.COMPONENT_REGISTRY][tagName],

    createElement: (virtualNode: IVirtualNode, parentDomElement: IElement): IElement | undefined => {
      let newEl: Element;
      let componentCtor = st.getComponent(virtualNode.type) as any;
      let component;

      // identified virtual component
      if (componentCtor) {
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
        }

        // set root DOM node ref and parent ref
        component.INTERNAL.parentEl = parentDomElement;
        component.INTERNAL.parent = parentDomElement.$stComponentRef;

        // assign attributes, slotChildren etc.
        component.INTERNAL.virtualNode = virtualNode;
      }

      if (component) {

        if (component.INTERNAL.parent) {
          if (!component.INTERNAL.parent.INTERNAL.childComponents) {
            component.INTERNAL.parent.INTERNAL.childComponents = [];
          }
          component.INTERNAL.parent.INTERNAL.childComponents.push(component);
        }

        // to analyze, filter and transform before create
        component.onBeforeElCreate(virtualNode);
      }

      if (virtualNode.type.toUpperCase() === "SVG" || st.dom.hasSvgNamespace(parentDomElement, virtualNode.type.toUpperCase())) {
        newEl = document.createElementNS(SVG_NAMESPACE, virtualNode.type as string);
      } else {
        if (component) {
          // use <class-name> instead of ClassName which would end up as <classname> in DOM
          virtualNode.type = component.tag || componentCtor.COMPONENT_OPTIONS.tag;
        }

        // support for <component tag="h1"> and <div tag="h2"> cases
        if (virtualNode.attributes && virtualNode.attributes.tag) {
          virtualNode.type = virtualNode.attributes.tag;
        }

        newEl = document.createElement(virtualNode.type as string);
      }

      if (component) {
        // set element reference
        component.INTERNAL.el = newEl;

        //console.log('set .el', component)

        // reference component logical controller component
        (newEl as IElement).$stComponent = component;
        (newEl as IElement).$stComponentRef = component;
      } else {
        // passing down parent component reference
        (newEl as IElement).$stComponentRef = parentDomElement.$stComponentRef;
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

      parentDomElement.appendChild(newEl);

      if (component) {
        component.connectedCallback!();
      }
      return newEl as IElement;
    },

    createTextNode: (text: string, domElement: IElement) => {
      domElement.appendChild(document.createTextNode(text));
    },

    createChildElements: (virtualChildren: IVirtualChildren, domElement: IElement) => {
      for (let virtualChild of virtualChildren as Array<IVirtualChild>) {
        if (isPrimitive(virtualChild)) {
          st.dom.createTextNode((virtualChild || "").toString(), domElement);
        } else {
          if (isJSXComment(virtualChild as IVirtualNode)) {
            continue;
          }

          st.dom.createElement(virtualChild as IVirtualNode, domElement);
        }
      }
    },

    setAttribute: (name: string, value: any, domElement: IElement, forceNative?: boolean) => {
      // don't render debug attributes like __source and __self
      if (name.indexOf(ATTR_DEBUG_PREFIX) === 0) return;

      // stores referenced DOM nodes in a memory efficient WeakMap
      // for access from CustomElements
      if (name === REF_ATTRIBUTE_NAME) {
        const refName = Object.keys(value)[0];
        if (process.env.NODE_ENV === "development") {
          st.info("dom.ts", "@ref-setting", value[refName], `.${refName} = `, domElement);
        }

        if (!domElement.$stComponentRef.INTERNAL.refs) {
          domElement.$stComponentRef.INTERNAL.refs = [];
        }
        domElement.$stComponentRef.INTERNAL.refs.push(refName);

        const refValue = domElement.$stComponent || domElement;
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

        if (process.env.NODE_ENV === "development") {
          st.info(
            "dom.ts",
            domElement,
            `.addEventListener('${eventName}', `,
            value,
            ", /* capture */ ",
            doCapture,
            `)`,
          );
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
        } else if (name === "style" && typeof value !== TYPE_STRING) {
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
      const standardHTMLAttributes = [CLASS_ATTRIBUTE_NAME, "style", "id", "tabindex"];

      return standardHTMLAttributes.indexOf(name.toLowerCase()) > -1;
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

  if (!st.render) {
    // add render method for awaiting / initial rendering
    st.render = async (virtualNode: IVirtualNode, domNode: Element = document.body) => {
      (st.render as any)._rendered = true;

      if (!virtualNode.type || !virtualNode.attributes || !virtualNode.children) {
        st.error("Invalid virutal node: ", JSON.stringify(virtualNode));
        throw new Error("This virtual node does NOT look like one");
      }

      // wait for the DOM to become ready, then render (prevents errors if a novice calls st.render() before <body> exists)
      await st.dom.isReady();
      st.dom.createElement(virtualNode, domNode);
    };

    setTimeout(() => {
      if (!(st.render as any)._rendered) {
        st.warn("st.render(<SomeComponent />) has NOT been called in 100ms. Have you forgotten to add this call?");
      }
    }, 100);
  }
}
