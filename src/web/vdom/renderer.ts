import { st } from "../../core/st/st";
import { IElement } from "./interface/ielement";
import { IVirtualNode } from "./interface/ivirtual-node";
import { filterCommentsAndUndefines, tsxToStandardAttributeName } from "./tsx";
import { NOVDOM_ATTRIBUTE_NAME } from "./interface/iattributes";
import { TYPE_OBJECT } from "../../core/lang/type-object";
import { TYPE_UNDEFINED } from "../../core/lang/type-undefined";
import { ATTR_EVENT_LISTENER_PREFIX, LIST_KEY_ATTRIBUTE_NAME, ATTR_DEBUG_PREFIX } from "./dom";

if (!st.renderer) {

  st.renderer = {

    renderInitial: (
      virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined>,
      parentDomElement: IElement,
    ) => {
      if (Array.isArray(virtualNode) && virtualNode) {
        st.dom.createChildElements(virtualNode, parentDomElement);
      } else if (virtualNode) {
        st.dom.createElement(virtualNode as IVirtualNode | undefined, parentDomElement);
      }
    },

    patch: (
      domElements: Array<IElement>,
      virtualElements: Array<IVirtualNode | string | undefined>,
      parent: IElement,
    ) => {

      // comments and undefines can occur at any place dynamically
      virtualElements = filterCommentsAndUndefines(virtualElements) as Array<IVirtualNode>;

      // length to walk is the bigger number of both lists (reality in DOM vs. virtual DOM)
      const maxLength = domElements.length > virtualElements.length ? domElements.length : virtualElements.length;

      // walk through max. possible  differences on this level of the subtree
      for (let i = 0; i < maxLength; i++) {
        // removeChild() called before and end of similarities is logically reached
        const domElement = domElements[i];
        const virtualElement = virtualElements[i];

        if (!virtualElement && !domElement) {
          break;
        }

        if (typeof virtualElement === TYPE_OBJECT) {
          st.renderer.patchElement(parent, domElement, virtualElement as IVirtualNode);
        } else {
          st.renderer.patchTextNode(parent, domElement, (virtualElement as unknown) as string);
        }
      }
    },

    removeElement: (parent: IElement, domElement: IElement) => {
      parent.removeChild(domElement);
    },

    patchElement: (parent: IElement, domElement: IElement, virtualElement: IVirtualNode) => {
      // ignore this element and it's while sub-tree (allows for manually changed DOM sub-trees to be retained)

      if (domElement && domElement.nodeType != 3 /* not Text*/ && domElement[NOVDOM_ATTRIBUTE_NAME]) return;

      if (domElement && domElement.$stComponent) {
        domElement.$stComponent.onBeforePatchEl();
      }

      let created = false;
      let replaced = false;
      let removed = false;
      let changedAttribute = false;

      if (!virtualElement && domElement) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        st.renderer.removeElement(parent, domElement);
        removed = true;
      } else if (virtualElement && !domElement) {
        // VirtualElement exists but no DOMElement: Append node
        domElement = st.dom.createElement(virtualElement, parent) as IElement;
        created = true;
      } else if (
        virtualElement &&
        domElement &&
        (domElement.tagName || "").toUpperCase() !== virtualElement.type.toUpperCase()
      ) {
        // DOMElement and VirtualElement existing but tagName differs: Replace node
        // also: DOMElement is a TextNode (typeof tagName == 'undefined') but VirtualElement is not

        // tag name differs, replace node
        st.renderer.removeElement(parent, domElement);

        domElement = st.dom.createElement(virtualElement, parent) as IElement;
        created = true;

      } else {
        // DOMElement and VirtualElement are the same on index and tagName
        // but attributes might differ: May update attributes
        // this.updateAllAttributeEventListeners(virtualElement, domElement);

        // DOMElement might have attributes that differ from VirtualElement attributes
        // Replace attribute value then
        if (domElement.attributes) {
          const attributes: Array<Attr> = Array.from(domElement.attributes);

          for (let a = 0; a < attributes.length; a++) {
            const attributeName = tsxToStandardAttributeName(attributes[a].name);

            if (!attributeName.startsWith(ATTR_EVENT_LISTENER_PREFIX)) {
              if (!virtualElement.attributes || !virtualElement.attributes[attributeName]) {
                // ignore cases such as: id, class, style, tabindex
                if (!(domElement.$stComponent && st.dom.isStandardHTMLAttribute(attributeName))) {
                  // DOMElement has an attribute that doesn't exist on VirtualElement attributes anymore
                  domElement.removeAttribute(attributeName);
                  changedAttribute = true;
                }
              } else if (domElement.getAttribute(attributeName) != virtualElement.attributes[attributeName]) {
                if (attributeName === LIST_KEY_ATTRIBUTE_NAME) {
                  st.renderer.removeElement(parent, domElement);

                  domElement = st.dom.createElement(virtualElement, parent) as IElement;
                  replaced = true;
                } else {
                  // ignore cases such as: id, class, style, tabindex but inform component
                  if (domElement.$stComponent && st.dom.isStandardHTMLAttribute(attributeName)) {

                    // TODO: Implement merge algorithm
                    domElement.$stComponent.handleUpdateElAttribute(
                      attributeName,
                      virtualElement.attributes[attributeName],
                    );
                  } else {
                    // DOMElement attribute value differs from VirtualElement attribute: Update
                    st.dom.setAttribute(attributeName, virtualElement.attributes[attributeName], domElement);
                    changedAttribute = true;
                  }
                }
              }
            }
          }
        }

        // VirtualElement might have additional attributes, DOMElement doesn't have atm
        if (!replaced && virtualElement.attributes) {
          // update attributes
          for (let attributeName in virtualElement.attributes) {
            attributeName = tsxToStandardAttributeName(attributeName);

            if (
              !attributeName.startsWith(ATTR_DEBUG_PREFIX) &&
              !attributeName.startsWith(ATTR_EVENT_LISTENER_PREFIX) &&
              virtualElement.attributes.hasOwnProperty(attributeName) &&
              !domElement.hasAttribute(attributeName)
            ) {
              // DOMElement attribute value differs from VirtualElement attribute: Set
              st.dom.setAttribute(attributeName, virtualElement.attributes[attributeName], domElement);
              changedAttribute = true;
            }
          }
        }

        if (domElement && domElement.$stComponent) {
          domElement.$stComponent.onAfterPatchEl();
        }
      }

      const hasChanged = created || removed || replaced || changedAttribute;

      // process children (recursion)

      // inner should only be patched if it is not a custom element and has no shadow DOM

      if (domElement && domElement.$stComponent) {
        // update slot children
        domElement.$stComponent.INTERNAL.virtualNode = virtualElement;
        domElement.$stComponent.doRender();
        return;
      } else {
        // must be a child or sub-child of a node with an $stComponent
        if (hasChanged) {
          // @ts-ignore
          domElement.$stComponentRef.INTERNAL.hasDOMChanged = true;
        }
      }

      // optimization: If freshly created, all children are already perfectly rendered
      // so no need to walk through all child nodes
      if (!created && !replaced) {
        // parent elements must be both existing
        if (
          domElement &&
          virtualElement &&
          // and at least the existing DOM subtree
          // or the virtual DOM subtree must be given
          ((domElement.childNodes && domElement.childNodes.length) ||
            (virtualElement.children && virtualElement.children.length))
        ) {
          // recursive call with childNodes and virtualElement childNodes
          st.renderer.patch(
            ((domElement.childNodes as unknown) as Array<IElement>) || (([] as unknown) as Array<IElement>),
            virtualElement.children as any,
            domElement,
          );
        }
      }
    },

    patchTextNode: (parent: IElement, domElement: IElement, virtualElementTextContent: string) => {

      let created = false;
      let replaced = false;
      let removed = false;
      let updated = false;

      // text node content
      if (typeof virtualElementTextContent == TYPE_UNDEFINED && domElement) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        parent.removeChild(domElement);
        removed = true;
      } else if (virtualElementTextContent && !domElement) {
        // VirtualElement exists but no DOMElement: Append node
        if (parent.nodeType === Node.TEXT_NODE) {
          parent.textContent += virtualElementTextContent;
        } else {
          st.dom.createTextNode(virtualElementTextContent, parent);
        }
        created = true;
      } else if (virtualElementTextContent && domElement) {
        // TextNode is present on both sides but content might differ
        // update innerText

        if (domElement.nodeType === Node.TEXT_NODE) {
          // DOMElement remains being a TextNode
          // ...but has changed: Reflect the change
          if (domElement.textContent != virtualElementTextContent) {
            domElement.textContent = virtualElementTextContent;
            updated = true;
          }
        } else {
          // VirtualElement is a TextNode now but DOMElement is not: remove and replace
          parent.removeChild(domElement);
          st.dom.createTextNode(virtualElementTextContent, parent);
          replaced = true;
        }
      }

      if (created || replaced || removed || updated) {
        // @ts-ignore
        parent.$stComponentRef.INTERNAL.hasDOMChanged = true;
      }
    },
  };
}
