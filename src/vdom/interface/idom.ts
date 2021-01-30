import { IVirtualChildren, IVirtualNode } from "./ivirtual-node";
import { IElement } from "./ielement";

export interface IDOM {

  setDomImpl(domImpl: Partial<Window>): void; 

  isReady(): Promise<void>;

  isStandardHTMLAttribute(name: string): boolean;

  hasElNamespace(domElement: Element): boolean;

  hasSvgNamespace(parentElement: Element, type: string): boolean;

  getTagToUse(virtualNode: IVirtualNode): string;

  createElementOrElements(
    virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined | string>,
    parentDomElement: Element,
    detached?: boolean
  ): Array<IElement | Text | undefined> | IElement | Text | undefined;

  createElement(
    virtualNode: IVirtualNode | undefined,
    parentDomElement?: Element,
    detached?: boolean): IElement | undefined;

  createTextNode(
    text: string,
    parentDomElement: Element,
    detached?: boolean
  ): Text;

  replaceElement(
    virtualNode: IVirtualNode | undefined,
    parentDomElement: Element,
    oldDomChildElement: Element
  ): IElement;

  replaceTextNode(
    virtualElementTextContent: string,
    parentDomElement: Element,
    oldDomChildElement: Element
  ): Text;

  createChildElements(
    virtualChildren: IVirtualChildren,
    parentDomElement: Element,
    detached?: boolean
  ): Array<IElement | Text | undefined>;

  setAttribute(name: string, value: any, parentDomElement: Element, forceNative?: boolean): void;

  setAttributes(attributes: any, parentDomElement: Element, forceNative?: boolean): void;

  removeElement(domElement: Element): void;
  removeChildren(domElement: Element): void;
}
