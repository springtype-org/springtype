import { IElement } from "./ielement";
import { IVirtualNode } from "./ivirtual-node";

export interface IRenderer {

  IGNORED_ATTRIBUTES: Array<string>;

  renderInitial(
    virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined | string>,
    parentDomElement: IElement,
  ): Array<IElement | Text | undefined> | IElement | Text | undefined;

  patch(
    domElements: Array<IElement>,
    virtualElements: Array<IVirtualNode | string | undefined>,
    parent: IElement,
  ): void;

  patchElement(parent: IElement, domElement: IElement, virtualElement: IVirtualNode): void;

  patchTextNode(parent: IElement, domElement: IElement, virtualElementTextContent: string): void;

  removeElement(parent: IElement, domElement: IElement): void;

  setIgnoredAttributes(attributeNames: Array<string>): void;
}
