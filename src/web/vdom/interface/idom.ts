import { IVirtualChildren, IVirtualNode } from "./ivirtual-node";

export interface IDOM {
	svgContext: boolean;

	hasSvgNamespace(type: string): boolean;

	createElement(
		virtualNode: IVirtualNode | undefined,
		parentDomElement: Element,
		isSvg?: boolean
	): Element | undefined;

	createTextNode(text: string, parentDomElement: Element): void;

	createChildElements(
		virtualChildren: IVirtualChildren,
		parentDomElement: Element,
		isSvg?: boolean
	): void;

	setAttribute(
		name: string,
		value: any,
		parentDomElement: Element,
		isSvg?: boolean
	): void;

	setAttributes(
		attributes: any,
		parentDomElement: Element,
		isSvg?: boolean
	): void;
}
