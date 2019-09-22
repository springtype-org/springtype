import { st } from "../../core/st/st";
import { IElement } from "./interface/ielement";
import {
	IVirtualChild,
	IVirtualChildren,
	IVirtualNode
} from "./interface/ivirtual-node";
import { flattenChildren, tsxToStandardAttributeName } from "./tsx";

const LIST_KEY_ATTRIBUTE_NAME = "key";

if (!st.renderer) {
	st.renderer = {
		renderInitial: (
			virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined>,
			parentDomElement: IElement
		) => {
			if (Array.isArray(virtualNode) && virtualNode) {
				st.dom.createChildElements(virtualNode, parentDomElement);
			} else if (virtualNode) {
				st.dom.createElement(
					virtualNode as IVirtualNode | undefined,
					parentDomElement
				);
			}
		},

		patch: (
			domElements: NodeListOf<IElement>,
			virtualElements: Array<IVirtualNode | string | undefined>,
			parent: IElement
		) => {
			// length to walk is the bigger number of both lists (reality in DOM vs. virtual DOM)
			let maxLength =
				domElements.length > virtualElements.length
					? domElements.length
					: virtualElements.length;

			// walk through max. possible  differences on this level of the subtree
			for (let i = 0; i < maxLength; i++) {
				// removeChild() called before and end of similarities is logically reached
				if (!virtualElements[i] && !domElements[i]) {
					break;
				}

				let domElement = domElements[i];

				if (typeof virtualElements[i] === "object") {
					st.renderer.patchElement(parent, domElement, virtualElements[
						i
					] as IVirtualNode);
				} else {
					st.renderer.patchTextNode(parent, domElement, (virtualElements[
						i
					] as unknown) as string);
				}
			}
		},

		patchElementTree: (
			domElements: NodeListOf<IElement>,
			virtualElements: IVirtualChildren,
			parent: IElement
		) => {
			// TODO: Fixme
			// flatten/normalize Array<Array<IVirtualChild>>
			virtualElements = flattenChildren(virtualElements);

			// length to walk is the bigger number of both lists (reality in DOM vs. virtual DOM)
			let maxLength =
				domElements.length > virtualElements.length
					? domElements.length
					: virtualElements.length;

			// walk through max. possible  differences on this level of the subtree
			for (let i = 0; i < maxLength; i++) {
				// removeChild() called before and end of similarities is logically reached
				if (!virtualElements[i] && !domElements[i]) {
					break;
				}

				if (typeof virtualElements[i] === "object") {
					st.renderer.patchElement(parent, domElements[i], virtualElements[
						i
					] as IVirtualNode);
				} else {
					st.renderer.patchTextNode(parent, domElements[i], (virtualElements[
						i
					] as IVirtualChild) as string);
				}
			}
		},

		callOnBeforeDisconnectLifecycleMethod: (domElement: IElement) => {
			if (customElements.get(domElement.nodeName)) {
				if (typeof domElement.onBeforeDisconnect == "function") {
					domElement.onBeforeDisconnect!();
				}
			}
		},

		patchElement: (
			parent: IElement,
			domElement: IElement,
			virtualElement: IVirtualNode
		) => {
			// ignore this element and it's while sub-tree (allows for manually changed DOM sub-trees to be retained)
			if (domElement && domElement.hasAttribute("data-vdom-ignore")) return;

			let created = false;
			let replaced = false;

			if (!virtualElement && domElement) {
				// DOMElement existing but no such VirtualElement: Evict zombie node

				// call lifecycle method
				st.renderer.callOnBeforeDisconnectLifecycleMethod(domElement);
				parent.removeChild(domElement);
			} else if (virtualElement && !domElement) {
				// VirtualElement exists but no DOMElement: Append node
				domElement = st.dom.createElement(virtualElement, parent) as IElement;
				created = true;
			} else if (
				virtualElement &&
				domElement &&
				(domElement.tagName || "").toUpperCase() !==
					virtualElement.type.toUpperCase()
			) {
				// DOMElement and VirtualElement existing but tagName differs: Replace node
				// also: DOMElement is a TextNode (typeof tagName == 'undefined') but VirtualElement is not

				// tag name differs, replace node
				st.renderer.callOnBeforeDisconnectLifecycleMethod(domElement);
				parent.removeChild(domElement);

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
						const attributeName = tsxToStandardAttributeName(
							attributes[a].name
						);

						if (!attributeName.startsWith("on")) {
							if (
								!virtualElement.attributes ||
								!virtualElement.attributes[attributeName]
							) {
								// DOMElement has an attribute that doesn't exist on VirtualElement attributes anymore
								domElement.removeAttribute(attributeName);
							} else if (
								domElement.getAttribute(attributeName) !==
								virtualElement.attributes[attributeName]
							) {
								if (attributeName === LIST_KEY_ATTRIBUTE_NAME) {
									st.renderer.callOnBeforeDisconnectLifecycleMethod(domElement);
									parent.removeChild(domElement);
									replaced = true;
									st.dom.createElement(virtualElement, parent) as IElement;
								} else {
									// DOMElement attribute value differs from VirtualElement attribute: Update

									// TODO: SVG?
									st.dom.setAttribute(
										attributeName,
										virtualElement.attributes[attributeName],
										domElement
									);
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
							virtualElement.attributes.hasOwnProperty(attributeName) &&
							!domElement.hasAttribute(attributeName) &&
							!attributeName.startsWith("on")
						) {
							// DOMElement attribute value differs from VirtualElement attribute: Set

							// TODO: SVG?
							st.dom.setAttribute(
								attributeName,
								virtualElement.attributes[attributeName],
								domElement
							);
						}
					}
				}
			}

			// process children (recursion)

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
					st.renderer.patchElementTree(
						(domElement.childNodes as NodeListOf<IElement>) ||
							(([] as unknown) as NodeListOf<IElement>),
						virtualElement.children,
						domElement
					);
				}
			}
		},

		patchTextNode: (
			parent: IElement,
			domElement: IElement,
			virtualElementTextContent: string
		) => {
			// text node content
			if (typeof virtualElementTextContent == "undefined" && domElement) {
				// DOMElement existing but no such VirtualElement: Evict zombie node
				parent.removeChild(domElement);
			} else if (virtualElementTextContent && !domElement) {
				// VirtualElement exists but no DOMElement: Append node
				if (parent.nodeType === Node.TEXT_NODE) {
					parent.textContent += virtualElementTextContent;
				} else {
					st.dom.createTextNode(virtualElementTextContent, parent);
				}
			} else if (virtualElementTextContent && domElement) {
				// TextNode is present on both sides but content might differ
				// update innerText

				if (domElement.nodeType === Node.TEXT_NODE) {
					// DOMElement remains being a TextNode
					// ...but has changed: Reflect the change
					if (domElement.textContent !== virtualElementTextContent) {
						domElement.textContent = virtualElementTextContent;
					}
				} else {
					// VirtualElement is a TextNode now but DOMElement is not: remove and replace
					parent.removeChild(domElement);
					st.dom.createTextNode(virtualElementTextContent, parent);
				}
			}
		}
	};
}
