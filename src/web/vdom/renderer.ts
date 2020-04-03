import { st } from "../../core/st";
import { IElement, IVirtualNode } from "./interface";
import { filterComments, tsxToStandardAttributeName } from "./tsx";
import { NOVDOM_ATTRIBUTE_NAME } from "./interface/iattributes";
import { TYPE_OBJECT } from "../../core/lang/type-object";
import { TYPE_UNDEFINED } from "../../core/lang/type-undefined";
import { ATTR_EVENT_LISTENER_PREFIX, LIST_KEY_ATTRIBUTE_NAME, ATTR_DEBUG_PREFIX, CLASS_ATTRIBUTE_NAME, STYLE_ATTRIBUTE_NAME } from "./dom";
import { mergeArrays } from "../../core/lang/merge-arrays";
import { mergeObjects } from "../../core/lang/merge-objects";
import { RenderReason } from "../component/interface/irender-reason";
import { AttrTrait, AttrType } from "../component/trait/attr";

if (!st.renderer) {

  st.renderer = {

    IGNORED_ATTRIBUTES: [],

    renderInitial: (
      virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>,
      parentDomElement: IElement,
    ): Array<IElement | Text | undefined> | IElement | Text | undefined => {

      if (typeof virtualNode == 'string') {
        return st.dom.createTextNode(virtualNode, parentDomElement);
      }
      return st.dom.createElementOrElements(virtualNode, parentDomElement);
    },

    patch: (
      domElements: Array<IElement>,
      virtualElements: Array<IVirtualNode | string | undefined>,
      parent: IElement,
    ) => {

      // comments and undefines can occur at any place dynamically
      virtualElements = filterComments(virtualElements) as Array<IVirtualNode>;

      // length to walk is the bigger number of both lists (reality in DOM vs. virtual DOM)
      const maxLength = domElements.length > virtualElements.length ? domElements.length : virtualElements.length;

      // walk through max. possible  differences on this level of the subtree
      for (let i = 0; i < maxLength; i++) {
        // removeChild() called before and end of similarities is logically reached
        const domElement = domElements[i];
        const virtualElement = virtualElements[i];

        if (typeof virtualElement == TYPE_UNDEFINED && typeof domElement == TYPE_UNDEFINED) {
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
      // ignore on component level
      if (parent && parent.$stComponent && parent.$stComponent.INTERNAL.attributes[NOVDOM_ATTRIBUTE_NAME]) return;
      if (domElement && domElement.$stComponent && domElement.$stComponent.INTERNAL.attributes[NOVDOM_ATTRIBUTE_NAME]) return;

      if (domElement && domElement.$stComponent) {
        domElement.$stComponent.onBeforePatchEl();
      }

      let created = false;
      let replaced = false;
      let removed = false;
      let changedAttribute = false;

      if (typeof virtualElement == TYPE_UNDEFINED && typeof domElement != TYPE_UNDEFINED) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        st.renderer.removeElement(parent, domElement);
        removed = true;
      } else if (typeof virtualElement != TYPE_UNDEFINED && typeof domElement == TYPE_UNDEFINED) {
        // VirtualElement exists but no DOMElement: Append node
        domElement = st.dom.createElement(virtualElement, parent) as IElement;
        created = true;
      } else if (
        virtualElement.attributes.doRender || (
          typeof virtualElement != TYPE_UNDEFINED &&
          typeof domElement != TYPE_UNDEFINED &&
          (domElement.tagName || "").toUpperCase() !== st.dom.getTagToUse(domElement.$stComponent, virtualElement).toUpperCase())
      ) {
        // DOMElement and VirtualElement existing but tagName differs: Replace node
        // also: DOMElement is a TextNode (typeof tagName == 'undefined') but VirtualElement is not
        domElement = st.dom.replaceElement(virtualElement, parent, domElement) as IElement;
        replaced = true;

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

            // ignored attributes
            if (st.renderer.IGNORED_ATTRIBUTES.indexOf(attributeName) > -1) continue;

            if (!attributeName.startsWith(ATTR_EVENT_LISTENER_PREFIX)) {
              if (!virtualElement.attributes || !virtualElement.attributes[attributeName]) {

                // ignore cases such as: id, class, style, tabindex or DOM transparent attributes
                if (!(domElement.$stComponent && (st.dom.isStandardHTMLAttribute(attributeName) || AttrTrait.getType(domElement.$stComponent, attributeName) === AttrType.DOM_TRANSPARENT))) {
                  // DOMElement has an attribute that doesn't exist on VirtualElement attributes anymore
                  domElement.removeAttribute(attributeName);
                  changedAttribute = true;
                }
              } else if (domElement.getAttribute(attributeName) != virtualElement.attributes[attributeName]) {
                if (attributeName === LIST_KEY_ATTRIBUTE_NAME) {
                  domElement = st.dom.replaceElement(virtualElement, parent, domElement) as IElement;
                  replaced = true;
                } else {

                  // case: a component re-renders and it's values for standard HTML attributes did change
                  // such as style, class etc. - the new values need to be merged in to reflect the state change in DOM
                  if (domElement.$stComponent && st.dom.isStandardHTMLAttribute(attributeName)) {

                    if (attributeName === CLASS_ATTRIBUTE_NAME) {
                      const mergeResult = mergeArrays(domElement.$stComponent.INTERNAL[attributeName], virtualElement.attributes[attributeName]);
                      st.dom.setAttribute(attributeName, mergeResult, domElement);
                      changedAttribute = true;
                    } else if (attributeName === STYLE_ATTRIBUTE_NAME) {
                      const mergeResult = mergeObjects(domElement.$stComponent.INTERNAL[attributeName], virtualElement.attributes[attributeName]);
                      st.dom.setAttribute(attributeName, mergeResult, domElement);
                      changedAttribute = true;
                    } else {
                      st.dom.setAttribute(attributeName, virtualElement.attributes[attributeName] || domElement.$stComponent.INTERNAL[attributeName], domElement);
                      changedAttribute = true;
                    }

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

        if (typeof domElement != TYPE_UNDEFINED && domElement.$stComponent) {
          domElement.$stComponent.onAfterPatchEl();
        }
      }

      const hasChanged = created || removed || replaced || changedAttribute;

      // process children (recursion)

      // inner should only be patched if it is not a custom element and has no shadow DOM
      if (typeof domElement != TYPE_UNDEFINED && domElement.$stComponent) {

        // update slot children
        domElement.$stComponent.virtualNode = virtualElement;

        if (domElement.$stComponent.shouldRender(RenderReason.CHILDREN_UPDATE)) {
          domElement.$stComponent.doRender();
        }
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
          typeof domElement != TYPE_UNDEFINED &&
          typeof virtualElement != TYPE_UNDEFINED &&
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
      if (typeof virtualElementTextContent == TYPE_UNDEFINED && typeof domElement != TYPE_UNDEFINED) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        parent.removeChild(domElement);
        removed = true;
      } else if (typeof virtualElementTextContent != TYPE_UNDEFINED && typeof domElement == TYPE_UNDEFINED) {

        // VirtualElement exists but no DOMElement: Append node
        if (parent.nodeType === Node.TEXT_NODE) {
          parent.textContent += virtualElementTextContent;
        } else {
          st.dom.createTextNode(virtualElementTextContent, parent);
        }
        created = true;
      } else if (typeof virtualElementTextContent != TYPE_UNDEFINED && typeof domElement != TYPE_UNDEFINED) {
        // TextNode is present on both sides but content might differ
        // update innerText

        if (domElement.nodeType === Node.TEXT_NODE) {
          // DOMElement remains being a TextNode
          // ...but has changed: Reflect the change
          if (domElement.textContent !== virtualElementTextContent) {
            domElement.textContent = virtualElementTextContent;
            updated = true;
          }
        } else {
          // VirtualElement is a TextNode now but DOMElement is not: remove and replace
          st.dom.replaceTextNode(virtualElementTextContent, parent, domElement);
          replaced = true;
        }
      }

      if (created || replaced || removed || updated) {
        // @ts-ignore
        parent.$stComponentRef.INTERNAL.hasDOMChanged = true;
      }
    },

    setIgnoredAttributes: (attributeNames: Array<string>) => {
      st.renderer.IGNORED_ATTRIBUTES.push(...attributeNames);
    }
  };

  if (!st.render) {
    // add render method for awaiting / initial rendering
    st.render = async (virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>, domNode: Element = document.body) => {

      // timeout warning flag
      (st.render as any)._rendered = true;

      // wait for the DOM to become ready, then render (prevents errors if a novice calls st.render() before <body> exists)
      await st.dom.isReady();

      // render root element
      st.renderer.renderInitial(virtualNode, domNode as IElement);

      if (st.router) {

        // all <Route>'s and <RouteList>'s are instantiated by now,
        // start rendering routes; method checks internally if already enabled.
        st.router.enable();
      }

      // standard style for .st-hide to work (st.hide(domElement), st.show(domElement))
      st.style('st-hide', `[st-hide] { display: 'none'; }`);
    };

    if (process.env.NDOE_ENV == 'development') {
      setTimeout(() => {
        if (!(st.render as any)._rendered) {
          st.warn("st.render(<SomeComponent />) has NOT been called in 100ms. Have you forgotten to add this call?");
        }
      }, 100);
    }
  }
}

