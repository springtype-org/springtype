import { st } from "../../core";
import { isPrimitive } from "../../core/lang/isPrimitive";
import "./DOMRef";
import { IElement } from "./interface/IElement";
import {
	IVirtualChild,
	IVirtualChildren,
	IVirtualNode
} from "./interface/IVirtualNode";
import { VirtualDOM } from "./VirtualDOM";

export class DOM {
	static svgContext: boolean = false;

	static init() {
		st.dom = DOM; // FIXME: no statics, instance, interface
	}

	static hasSvgNamespace(type: string): boolean {
		return DOM.svgContext && type !== "STYLE" && type !== "SCRIPT";
	}

	static createElement(
		virtualNode: IVirtualNode | undefined,
		parentDomElement: Element,
		isSvg?: boolean
	): Element | undefined {
		let newEl: Element;

		if (!virtualNode) return;

		if (typeof isSvg == "undefined") {
			if (virtualNode.type.toUpperCase() == "SVG") {
				DOM.svgContext = isSvg = true;
			}
		}

		if (DOM.hasSvgNamespace(virtualNode.type.toUpperCase())) {
			newEl = document.createElementNS(
				"http://www.w3.org/2000/svg",
				virtualNode.type as string
			);
		} else {
			newEl = document.createElement(virtualNode.type as string);
		}

		if (virtualNode.attributes) {
			DOM.setAttributes(virtualNode.attributes, newEl, isSvg);
		}

		if (virtualNode.children) {
			DOM.createChildElements(virtualNode.children, newEl, isSvg);
		}

		// call lifecycle method if it is a web component
		if (virtualNode.type.indexOf("-") > -1) {
			if (typeof (<IElement>newEl).onBeforeConnect == "function") {
				(<IElement>newEl).onBeforeConnect!();
			}
		}

		parentDomElement.appendChild(newEl);
		return newEl;
	}

	static createTextNode(text: string, parentDomElement: Element) {
		parentDomElement.appendChild(document.createTextNode(text));
	}

	static createChildElements(
		virtualChildren: IVirtualChildren,
		parentDomElement: Element,
		isSvg?: boolean
	) {
		for (let virtualChild of virtualChildren as Array<IVirtualChild>) {
			if (isPrimitive(virtualChild)) {
				DOM.createTextNode((virtualChild || "").toString(), parentDomElement);
			} else {
				DOM.createElement(
					virtualChild as IVirtualNode,
					parentDomElement,
					isSvg
				);

				// leave SVG context
				DOM.svgContext = false;
			}
		}
	}

	static setAttribute(
		name: string,
		value: any,
		parentDomElement: Element,
		isSvg?: boolean
	) {
		// stores referenced DOM nodes in a memory efficient WeakMap
		// for access from CustomElements
		if (name === "ref") {
			const refName = Object.keys(value)[0];
			st.setRef(refName, value[refName], parentDomElement);
			return;
		}

		if (name.startsWith("on") && typeof value == "function") {
			parentDomElement.addEventListener(name.substring(2).toLowerCase(), value);
			return;
		}

		if (isSvg && name.startsWith("xlink")) {
			parentDomElement.setAttributeNS(
				"http://www.w3.org/1999/xlink",
				VirtualDOM.tsxToStandardAttributeName(name),
				value
			);
		} else {
			parentDomElement.setAttribute(name, value);
		}
	}

	static setAttributes(
		attributes: any,
		parentDomElement: Element,
		isSvg?: boolean
	) {
		for (let name in attributes) {
			DOM.setAttribute(name, attributes[name], parentDomElement, isSvg);
		}
	}
}
DOM.init();
