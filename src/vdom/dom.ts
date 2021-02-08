import { IVirtualChildren, IVirtualNode, IVirtualNodeAttributes } from './interface/ivirtual-node';
import { st, ST_KEY } from '../st/st';
import { REF_ATTRIBUTE_NAME } from './interface/iattributes';
import { IElement } from './interface/ielement';
import {
  CLASS_ATTRIBUTE_NAME,
  CLASS_NAME_ATTRIBUTE_NAME,
  STYLE_ATTRIBUTE_NAME,
  XLINK_ATTRIBUTE_NAME,
} from './constants';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

// istanbul ignore else
if (!st.dom) {
  // DOM abstraction layer for manipulation
  st.dom = {
    hasElNamespace: (domElement: Element): boolean => domElement.namespaceURI === SVG_NAMESPACE,

    hasSvgNamespace: (parentElement: Element, type: string): boolean =>
      st.dom.hasElNamespace(parentElement) && type !== 'STYLE' && type !== 'SCRIPT',

    createElementOrElements: (
      virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined | string>,
      parentDomElement?: IElement,
    ): Array<IElement | Text | undefined> | IElement | Text | undefined => {
      if (Array.isArray(virtualNode)) {
        return st.dom.createChildElements(virtualNode, parentDomElement);
      }
      if (typeof virtualNode !== 'undefined') {
        return st.dom.createElement(virtualNode as IVirtualNode | undefined, parentDomElement);
      }
      // undefined virtualNode -> e.g. when a tsx variable is used in markup which is undefined
      return st.dom.createTextNode('', parentDomElement);
    },

    createElement: (virtualNode: IVirtualNode, parentDomElement?: IElement): IElement | undefined => {
      let newEl: Element;

      if (
        virtualNode.type.toUpperCase() === 'SVG' ||
        (parentDomElement && st.dom.hasSvgNamespace(parentDomElement, virtualNode.type.toUpperCase()))
      ) {
        newEl = document.createElementNS(SVG_NAMESPACE, virtualNode.type as string);
      } else {
        newEl = document.createElement(virtualNode.type as string);
      }

      // reference SpringType as a reference to every element created
      // this allows microframework addition libs like st-query to re-use this instance
      // with the correct domImpl the element belongs to
      (newEl as any)[ST_KEY] = st;

      // istanbul ignore else
      if (virtualNode.attributes) {
        st.dom.setAttributes(virtualNode.attributes, newEl);
      }

      // istanbul ignore else
      if (virtualNode.children) {
        st.dom.createChildElements(virtualNode.children, newEl);
      }

      // istanbul ignore else
      if (parentDomElement) {
        parentDomElement.appendChild(newEl);

        // check for a lifecycle "onMount" hook and call it
        if (typeof (newEl as any).$onMount === 'function') {
          (newEl as any).$onMount!();
        }
      }
      return newEl as IElement;
    },

    createTextNode: (text: string, domElement?: IElement): Text => {
      const node = document.createTextNode(text.toString());

      // istanbul ignore else
      if (domElement) {
        domElement.appendChild(node);
      }
      return node;
    },

    createChildElements: (
      virtualChildren: IVirtualChildren,
      domElement?: IElement,
    ): Array<IElement | Text | undefined> => {
      const children: Array<IElement | Text | undefined> = [];

      for (let i = 0; i < virtualChildren.length; i++) {
        const virtualChild = virtualChildren[i];
        if (virtualChild === null || (typeof virtualChild !== 'object' && typeof virtualChild !== 'function')) {
          children.push(
            st.dom.createTextNode(
              (typeof virtualChild === 'undefined' || virtualChild === null ? '' : virtualChild!).toString(),
              domElement,
            ),
          );
        } else {
          children.push(st.dom.createElement(virtualChild as IVirtualNode, domElement));
        }
      }
      return children;
    },

    setAttribute: (name: string, value: any, domElement: IElement) => {
      // attributes not set (undefined) are ignored; use null value to reset an attributes state
      if (typeof value === 'undefined') return;

      // save ref as { current: DOMElement } in ref object
      // allows for ref={someRef}
      if (name === REF_ATTRIBUTE_NAME && typeof value !== 'function') {
        value.current = domElement;
      } else if (name === REF_ATTRIBUTE_NAME && typeof value === 'function') {
        // allow for functional ref's like: render(<div ref={(el) => console.log('got el', el)} />)
        value(domElement);
      }

      if (name.startsWith('on') && typeof value === 'function') {
        let eventName = name.substring(2).toLowerCase();
        const capturePos = eventName.indexOf('capture');
        const doCapture = capturePos > -1;

        if (eventName === 'mount') {
          (domElement as any).$onMount = value;
        }

        // onClickCapture={...} support
        if (doCapture) {
          eventName = eventName.substring(0, capturePos);
        }
        domElement.addEventListener(eventName, value, doCapture);
        return;
      }

      // transforms className="..." -> class="..."
      // allows for React TSX to work seamlessly
      if (name === CLASS_NAME_ATTRIBUTE_NAME) {
        name = CLASS_ATTRIBUTE_NAME;
      }

      // transforms class={['a', 'b']} into class="a b"
      if (name === CLASS_ATTRIBUTE_NAME && Array.isArray(value)) {
        value = value.join(' ');
      }

      if (st.dom.hasElNamespace(domElement) && name.startsWith(XLINK_ATTRIBUTE_NAME)) {
        // allows for <svg><use xlinkHref ...></svg>
        domElement.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          `${XLINK_ATTRIBUTE_NAME}:${name.replace(XLINK_ATTRIBUTE_NAME, '')}`.toLowerCase(),
          value,
        );
      } else if (name === STYLE_ATTRIBUTE_NAME && typeof value !== 'string') {
        const propNames = Object.keys(value);

        // allows for style={{ margin: 10 }} etc.
        for (let i = 0; i < propNames.length; i++) {
          domElement.style[propNames[i] as any] = value[propNames[i]];
        }
      } else if (typeof value === 'boolean') {
        // for cases like <button checked={false} />
        (domElement as any)[name] = value;
      } else {
        // for any other case
        domElement.setAttribute(name, value);
      }
    },

    setAttributes: (attributes: IVirtualNodeAttributes, domElement: IElement, forceNative?: boolean) => {
      const attrNames = Object.keys(attributes);
      for (let i = 0; i < attrNames.length; i++) {
        st.dom.setAttribute(attrNames[i], attributes[attrNames[i]], domElement, forceNative);
      }
    },
  };
}
