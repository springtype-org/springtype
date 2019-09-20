import { IElement } from "./interface/IElement";
import { IRenderer } from "./interface/IRenderer";
import {
	IVirtualChild,
	IVirtualChildren,
	IVirtualNode
} from "./interface/IVirtualNode";
import { VirtualDOM } from "./VirtualDOM";

export class DOM implements IRenderer {
	static svgContext: boolean = false;

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
			if (typeof virtualChild == "string") {
				DOM.createTextNode(virtualChild, parentDomElement);
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
		if (isSvg && name.startsWith("xlink")) {
			parentDomElement.setAttributeNS(
				"http://www.w3.org/1999/xlink",
				VirtualDOM.tsxToStandardAttributeName(name),
				value
			);
		} else if (name.startsWith("on") && typeof value == "function") {
			parentDomElement.addEventListener(name.substring(2).toLowerCase(), value);
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
