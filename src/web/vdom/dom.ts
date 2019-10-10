import { st } from "../../core";
import { isPrimitive } from "../../core/lang/is-primitive";
import { TAG_NAME } from "./../customelement/interface/icustom-html-element";
import { IElement } from "./interface/ielement";
import { IVirtualChild, IVirtualChildren, IVirtualNode } from "./interface/ivirtual-node";
import { tsxToStandardAttributeName } from "./tsx";

if (!st.dom) {
  st.dom = {
    svgContext: false,

    isReady: async (): Promise<void> => {
      if (document.body) Promise.resolve();
      return new Promise(resolve => document.addEventListener("DOMContentLoaded", () => resolve()));
    },

    setRoot: (tagName: string): Element => {
      return document.body.appendChild(document.createElement(tagName));
    },

    hasSvgNamespace: (type: string): boolean => {
      return st.dom.svgContext && type !== "STYLE" && type !== "SCRIPT";
    },

    createElement: (virtualNode: IVirtualNode | undefined, parentDomElement: Element, isSvg?: boolean): Element | undefined => {
      let newEl: Element;

      if (!virtualNode) return;

      if (!virtualNode.attributes || !virtualNode.type || !virtualNode.children) {
        st.warn("The IVirtualNode ", virtualNode, "does NOT look like one! Parent DOM element: ", parentDomElement);
      }

      if (virtualNode.attributes["unwrap"]) {
        st.dom.createChildElements(virtualNode.children || [], parentDomElement, isSvg);
        return;
      }

      if (typeof isSvg == "undefined") {
        if (virtualNode.type.toUpperCase() == "SVG") {
          st.dom.svgContext = isSvg = true;
        }
      }

      if (st.dom.hasSvgNamespace(virtualNode.type.toUpperCase())) {
        newEl = document.createElementNS("http://www.w3.org/2000/svg", virtualNode.type as string);
      } else {
        newEl = document.createElement(virtualNode.type as string);
      }

      if (virtualNode.attributes) {
        st.dom.setAttributes(virtualNode.attributes, newEl, isSvg);
      }

      if (virtualNode.children) {
        st.dom.createChildElements(virtualNode.children, newEl, isSvg);
      }

      // call lifecycle method if it is a web component
      if (virtualNode.type.indexOf("-") > -1) {
        if (typeof (<IElement>newEl).onBeforeConnect == "function") {
          (<IElement>newEl).onBeforeConnect!();
        }
      }

      parentDomElement.appendChild(newEl);
      return newEl;
    },

    createTextNode: (text: string, parentDomElement: Element) => {
      parentDomElement.appendChild(document.createTextNode(text));
    },

    createChildElements: (virtualChildren: IVirtualChildren, parentDomElement: Element, isSvg?: boolean) => {
      for (let virtualChild of virtualChildren as Array<IVirtualChild>) {
        if (isPrimitive(virtualChild)) {
          st.dom.createTextNode((virtualChild || "").toString(), parentDomElement);
        } else {
          st.dom.createElement(virtualChild as IVirtualNode, parentDomElement, isSvg);

          // leave SVG context
          st.dom.svgContext = false;
        }
      }
    },

    setAttribute: (name: string, value: any, parentDomElement: Element, isSvg?: boolean) => {
      // stores referenced DOM nodes in a memory efficient WeakMap
      // for access from CustomElements
      if (name === "ref") {
        const refName = Object.keys(value)[0];
        if (process.env.NODE_ENV != "production" && st.debug) {
          st.info("dom.ts", "setting", value[refName], `.${refName} = `, parentDomElement);
        }
        st.setDomRef(refName, value[refName], parentDomElement);
        return;
      }

      if (name.startsWith("on") && typeof value == "function") {
        let eventName = name.substring(2).toLowerCase();
        const capture = eventName.indexOf("capture");
        const doCapture = capture > -1;

        if (doCapture) {
          eventName = eventName.substring(0, eventName.indexOf("capture"));
        }

        if (process.env.NODE_ENV != "production" && st.debug) {
          st.info("dom.ts", parentDomElement, `.addEventListener('${eventName}', `, value, ", /* capture */ ", doCapture, `)`);
        }

        parentDomElement.addEventListener(eventName, value, doCapture);
        return;
      }

      if (isSvg && name.startsWith("xlink")) {
        parentDomElement.setAttributeNS("http://www.w3.org/1999/xlink", tsxToStandardAttributeName(name), value);
      } else {
        parentDomElement.setAttribute(name, value);
      }
    },

    setAttributes: (attributes: any, parentDomElement: Element, isSvg?: boolean) => {
      for (let name in attributes) {
        st.dom.setAttribute(name, attributes[name], parentDomElement, isSvg);
      }
    },
  };

  if (!st.render) {
    st.render = (customElementClassRef: any, attributes?: Partial<typeof customElementClassRef>) => {
      const element = st.dom.setRoot(customElementClassRef[TAG_NAME]);

      for (let name in attributes) {
        // TODO: add support for SVG setAttributeNS
        element.setAttribute(name, attributes[name]);
      }
    };
  }
}
