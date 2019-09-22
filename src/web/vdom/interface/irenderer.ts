import { IElement } from "./ielement";
import { IVirtualChildren, IVirtualNode } from "./ivirtual-node";

export interface IRenderer {
	renderInitial(
		virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined>,
		parentDomElement: IElement
	): void;

	patch(
		domElements: NodeListOf<IElement>,
		virtualElements: Array<IVirtualNode | string | undefined>,
		parent: IElement
	): void;

	patchElementTree(
		domElements: NodeListOf<IElement>,
		virtualElements: IVirtualChildren,
		parent: IElement
	): void;

	callOnBeforeDisconnectLifecycleMethod(domElement: IElement): void;

	patchElement(
		parent: IElement,
		domElement: IElement,
		virtualElement: IVirtualNode
	): void;

	patchTextNode(
		parent: IElement,
		domElement: IElement,
		virtualElementTextContent: string
	): void;
}
