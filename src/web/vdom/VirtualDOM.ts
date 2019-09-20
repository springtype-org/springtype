import { error } from "../../core";
import {
	IVirtualChildren,
	IVirtualNode,
	IVirtualNodeType
} from "./interface/IVirtualNode";

export class VirtualDOM {
	static fromTSX(
		type: IVirtualNodeType,
		attributes:
			| JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any>
			| null,
		...children: IVirtualChildren[]
	): IVirtualNode<any> {
		// attributes can be null or an object: clone
		attributes = { ...attributes };

		// it's a custom element, but it's not registered
		if (type.indexOf("-") > -1 && !customElements.get(type)) {
			error(
				new Error(
					`@CustomElement('${type}', { ... }) is used but not imported. Make sure to @Use(...) the class name where you use the tag name!`
				)
			);
		}

		return {
			type,
			attributes,
			children
		};
	}
	static tsxToStandardAttributeName(tsxAttributeName: string): string {
		// support for SVG xlink:*
		if (tsxAttributeName.startsWith("xlink")) {
			return "xlink:" + tsxAttributeName.replace("xlink", "").toLowerCase();
		}

		switch (tsxAttributeName) {
			// support for React className -> class
			case "className":
				return "class";
		}
		return tsxAttributeName;
	}
}

export const tsx = VirtualDOM.fromTSX;
