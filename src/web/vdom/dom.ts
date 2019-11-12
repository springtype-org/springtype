import { st } from "../../core";
import { isPrimitive } from "../../core/lang/is-primitive";
import { GlobalCache } from "./../../core/st/interface/i$st";
import { IComponentOptions } from "./../component/interface/icomponent-options";
import { IElement } from "./interface/ielement";
import { IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeAttributes } from "./interface/ivirtual-node";
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
      let componentCtor = st.getComponent(virtualNode.type) as any;
      let component;

      if (typeof isSvg == "undefined") {
        if (virtualNode.type.toUpperCase() == "SVG") {
          st.dom.svgContext = isSvg = true;
        }
      }

      // identified virtual component
      if (componentCtor) {
        // functional component
        if (!componentCtor.name) {
          const fn = componentCtor as Function & {
            COMPONENT_OPTIONS: IComponentOptions;
          };

          // create shallow component instance
          component = new componentCtor();

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
        component.INTERNAL.parent = parentDomElement.$stComponent;

        // assign attributes, slotChildren etc.
        component.INTERNAL.virtualNode = virtualNode;
      }

      if (component) {
        // to analyze, filter and transform before create
        component.onBeforeElCreate(virtualNode);
      }

      if (st.dom.hasSvgNamespace(virtualNode.type.toUpperCase())) {
        newEl = document.createElementNS("http://www.w3.org/2000/svg", virtualNode.type as string);
      } else {
        if (component) {
          // use <class-name> instead of ClassName which would end up as <classname> in DOM
          virtualNode.type = componentCtor.COMPONENT_OPTIONS.tagName;
        }
        newEl = document.createElement(virtualNode.type as string);
      }

      if (component) {
        // set element reference
        component.INTERNAL.el = newEl;

        // reference component logical controller component
        (newEl as IElement).$stComponent = component;
      }

      if (virtualNode.attributes) {
        st.dom.setAttributes(virtualNode.attributes, newEl, isSvg);
      }

      if (component) {
        // to verify and mutate further
        component.onAfterElCreate!(newEl);
        component.onBeforeElChildrenCreate!();
      }

      if (virtualNode.children) {
        st.dom.createChildElements(virtualNode.children, newEl, isSvg);
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

    setAttribute: (name: string, value: any, domElement: IElement, isSvg?: boolean, forceNative?: boolean) => {
      // don't render debug attributes like __source and __self
      if (name.indexOf("__") === 0) return;

      // stores referenced DOM nodes in a memory efficient WeakMap
      // for access from CustomElements
      if (name === "ref") {
        const refName = Object.keys(value)[0];
        if (process.env.NODE_ENV === "development") {
          st.info("dom.ts", "setting", value[refName], `.${refName} = `, domElement);
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
          st.info("dom.ts", domElement, `.addEventListener('${eventName}', `, value, ", /* capture */ ", doCapture, `)`);
        }

        domElement.addEventListener(eventName, value, doCapture);
        return;
      }

      // transforms class={['a', 'b']} into class="a b"
      if (name === "class" && Array.isArray(value)) {
        value = value.join(" ");
      }

      if (isSvg && name.startsWith("xlink")) {
        domElement.setAttributeNS("http://www.w3.org/1999/xlink", tsxToStandardAttributeName(name), value);
      } else {
        if (domElement.$stComponent && !st.dom.isStandardHTMLAttribute(name) && forceNative !== true) {
          domElement.$stComponent.setAttribute(name, value);
        } else if (name === "style" && typeof value !== "string") {
          for (let prop in value) {
            domElement.style[prop as any] = value[prop];
          }
        } else {
          if (typeof value == "boolean") {
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
      const standardHTMLAttributes = ["class", "style", "id", "tabindex"];

      return standardHTMLAttributes.indexOf(name.toLowerCase()) > -1;
    },

    setAttributes: (attributes: IVirtualNodeAttributes, domElement: IElement, isSvg?: boolean, forceNative?: boolean) => {
      for (let name in attributes) {
        st.dom.setAttribute(name, attributes[name], domElement, isSvg, forceNative);
      }
    },
  };

  if (!st.render) {
    // add render method for awaiting / initial rendering
    st.render = async (node: IVirtualNode) => {
      (st.render as any)._rendered = true;

      if (!node.type || !node.attributes || !node.children) {
        st.error("Invalid virutal node: ", JSON.stringify(node));
        throw new Error("This virtual node does NOT look like one");
      }

      await st.dom.isReady();
      st.dom.createElement(node, document.body);
    };

    setTimeout(() => {
      if (!(st.render as any)._rendered) {
        st.warn("st.render(<SomeComponent />) as NOT been called in 100ms. Have you forgotten to add this call?");
      }
    }, 100);
  }
}
