import { st } from "../../core";
import { isPrimitive } from "../../core/lang/is-primitive";
import { IElement } from "./interface/ielement";
import {
	IVirtualChild,
	IVirtualChildren,
	IVirtualNode
} from "./interface/ivirtual-node";
import { flattenChildren, tsxToStandardAttributeName } from "./tsx";

if (!st.dom) {
	st.dom = {
		svgContext: false,

		hasSvgNamespace: (type: string): boolean => {
			return st.dom.svgContext && type !== "STYLE" && type !== "SCRIPT";
		},

		createElement: (
			virtualNode: IVirtualNode | undefined,
			parentDomElement: Element,
			isSvg?: boolean
		): Element | undefined => {
			let newEl: Element;

			if (!virtualNode) return;

			if (
				!virtualNode.attributes ||
				!virtualNode.type ||
				!virtualNode.children
			) {
				st.warn(
					"The IVirtualNode ",
					virtualNode,
					"does NOT look like one! Parent DOM element: ",
					parentDomElement
				);
			}

			if (virtualNode.attributes["unwrap"]) {
				st.dom.createChildElements(
					virtualNode.children || [],
					parentDomElement,
					isSvg
				);
				return;
			}

			if (typeof isSvg == "undefined") {
				if (virtualNode.type.toUpperCase() == "SVG") {
					st.dom.svgContext = isSvg = true;
				}
			}

			if (st.dom.hasSvgNamespace(virtualNode.type.toUpperCase())) {
				newEl = document.createElementNS(
					"http://www.w3.org/2000/svg",
					virtualNode.type as string
				);
			} else {
				newEl = document.createElement(virtualNode.type as string);
			}

			if (virtualNode.attributes) {
				st.dom.setAttributes(virtualNode.attributes, newEl, isSvg);
			}

			if (virtualNode.children) {
				// TODO: Fixme
				// flatten/normalize Array<Array<IVirtualChild>>
				virtualNode.children = flattenChildren(virtualNode.children);

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

		createChildElements: (
			virtualChildren: IVirtualChildren,
			parentDomElement: Element,
			isSvg?: boolean
		) => {
			for (let virtualChild of virtualChildren as Array<IVirtualChild>) {
				if (isPrimitive(virtualChild)) {
					st.dom.createTextNode(
						(virtualChild || "").toString(),
						parentDomElement
					);
				} else {
					st.dom.createElement(
						virtualChild as IVirtualNode,
						parentDomElement,
						isSvg
					);

					// leave SVG context
					st.dom.svgContext = false;
				}
			}
		},

		setAttribute: (
			name: string,
			value: any,
			parentDomElement: Element,
			isSvg?: boolean
		) => {
			// stores referenced DOM nodes in a memory efficient WeakMap
			// for access from CustomElements
			if (name === "ref") {
				const refName = Object.keys(value)[0];
				st.setDomRef(refName, value[refName], parentDomElement);
				return;
			}

			if (name.startsWith("on") && typeof value == "function") {
				parentDomElement.addEventListener(
					name.substring(2).toLowerCase(),
					value
				);
				return;
			}

			if (isSvg && name.startsWith("xlink")) {
				parentDomElement.setAttributeNS(
					"http://www.w3.org/1999/xlink",
					tsxToStandardAttributeName(name),
					value
				);
			} else {
				parentDomElement.setAttribute(name, value);
			}
		},

		setAttributes: (
			attributes: any,
			parentDomElement: Element,
			isSvg?: boolean
		) => {
			for (let name in attributes) {
				st.dom.setAttribute(name, attributes[name], parentDomElement, isSvg);
			}
		}
	};
}
