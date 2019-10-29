import { st } from "../../core";
import { isPrimitive } from "../../core/lang/is-primitive";
import { Component } from "../component";
import { COMPONENT_OPTIONS, INTERNAL } from "../component/interface/icomponent";
import { GlobalCache } from "./../../core/st/interface/i$st";
import { IElement } from "./interface/ielement";
import { IVirtualChild, IVirtualChildren, IVirtualNode } from "./interface/ivirtual-node";
import { isJSXComment, tsxToStandardAttributeName } from "./tsx";

if (!st.dom) {
  // DOM abstraction layer for manipulation
  st.dom = {
    svgContext: false,

    isReady: async (): Promise<void> => {
      if (document.body) Promise.resolve();
      return new Promise(resolve => document.addEventListener("DOMContentLoaded", () => resolve()));
    },

    hasSvgNamespace: (type: string): boolean => {
      return st.dom.svgContext && type !== "STYLE" && type !== "SCRIPT";
    },

    isRegisteredComponent: (tagName: string): boolean => !!st[GlobalCache.COMPONENT_REGISTRY][tagName],

    createElement: (virtualNode: IVirtualNode, parentDomElement: IElement, isSvg?: boolean): IElement | undefined => {
      let newEl: Element;
      let component = st.getComponent(virtualNode.type) as any;

      if (typeof isSvg == "undefined") {
        if (virtualNode.type.toUpperCase() == "SVG") {
          st.dom.svgContext = isSvg = true;
        }
      }

      if (st.dom.hasSvgNamespace(virtualNode.type.toUpperCase())) {
        newEl = document.createElementNS("http://www.w3.org/2000/svg", virtualNode.type as string);
      } else {

        if (component) {

          // use <class-name> instead of ClassName which would end up as <classname> in DOM
          virtualNode.type = component[COMPONENT_OPTIONS].tagName;
        }
        newEl = document.createElement(virtualNode.type as string);
      }

      // identified virtual component
      if (component) {

        // functional component
        // @ts-ignore
        if (!component.name) {
          // @ts-ignore
          const fn = component as Function;

          // TODO: Can it re-use an existing instance?

          // create shallow component instance
          component = new Component();

          // assign options
          // @ts-ignore
          component[INTERNAL].options = fn[COMPONENT_OPTIONS];

          // execute function and assign render method
          component.render = fn(component);
        } else {
          // class API
          // create instance of component
          // @ts-ignore
          component = new component();
        }

        // reference component logical controller component
        // @ts-ignore
        (newEl as IElement).component = component;

        // set root DOM node ref
        // @ts-ignore
        component[INTERNAL].root = newEl;

        // assign slot children for rewrite
        // @ts-ignore
        component[INTERNAL].slotChildren = virtualNode.slotChildren;
      }

      if (virtualNode.attributes) {
        st.dom.setAttributes(virtualNode.attributes, newEl, isSvg);
      }

      if (virtualNode.children) {
        st.dom.createChildElements(virtualNode.children, newEl, isSvg);
      }

      if (component) {
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

    createChildElements: (virtualChildren: IVirtualChildren, domElement: IElement, isSvg?: boolean) => {
      for (let virtualChild of virtualChildren as Array<IVirtualChild>) {
        if (isPrimitive(virtualChild)) {
          st.dom.createTextNode((virtualChild || "").toString(), domElement);
        } else {
          if (isJSXComment(virtualChild as IVirtualNode)) {
            continue;
          }

          st.dom.createElement(virtualChild as IVirtualNode, domElement, isSvg);

          // leave SVG context
          st.dom.svgContext = false;
        }
      }
    },

    setAttribute: (name: string, value: any, domElement: IElement, isSvg?: boolean) => {
      // stores referenced DOM nodes in a memory efficient WeakMap
      // for access from CustomElements
      if (name === "ref") {
        const refName = Object.keys(value)[0];
        if (process.env.NODE_ENV === "development") {
          st.debug && st.info("dom.ts", "setting", value[refName], `.${refName} = `, domElement);
        }
        st.setDomRef(refName, value[refName], domElement);
        return;
      }

      if (name.startsWith("on") && typeof value == "function") {
        let eventName = name.substring(2).toLowerCase();
        const capture = eventName.indexOf("capture");
        const doCapture = capture > -1;

        if (doCapture) {
          eventName = eventName.substring(0, eventName.indexOf("capture"));
        }

        if (process.env.NODE_ENV === "development") {
          st.debug && st.info("dom.ts", domElement, `.addEventListener('${eventName}', `, value, ", /* capture */ ", doCapture, `)`);
        }

        domElement.addEventListener(eventName, value, doCapture);
        return;
      }

      if (isSvg && name.startsWith("xlink")) {
        domElement.setAttributeNS("http://www.w3.org/1999/xlink", tsxToStandardAttributeName(name), value);
      } else {
        if (domElement.component) {
          domElement.component.setAttribute(name, value);
        } else {
          domElement.setAttribute(name, value);
        }
      }
    },

    setAttributes: (attributes: any, domElement: IElement, isSvg?: boolean) => {
      for (let name in attributes) {
        st.dom.setAttribute(name, attributes[name], domElement, isSvg);
      }
    },
  };

  if (!st.render) {
    // add render method for awaiting / initial rendering
    st.render = async (node: IVirtualNode) => {

      if (!node.type || !node.attributes || !node.children) {
        st.error('Invalid virutal node: ', JSON.stringify(node));
        throw new Error('This virtual node does NOT look like one');
      }

      await st.dom.isReady();
      st.dom.createElement(node, document.body);
    };
  }
}
