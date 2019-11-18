import { IElement } from "./ielement";
import { IVirtualNode } from "./ivirtual-node";

export interface IRenderer {
  renderInitial(
    virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined>,
    parentDomElement: IElement,
  ): void;

  patch(
    domElements: Array<IElement>,
    virtualElements: Array<IVirtualNode | string | undefined>,
    parent: IElement,
  ): void;

  patchElement(parent: IElement, domElement: IElement, virtualElement: IVirtualNode): void;

  patchTextNode(parent: IElement, domElement: IElement, virtualElementTextContent: string): void;

  removeElement(parent: IElement, domElement: IElement): void;
}
