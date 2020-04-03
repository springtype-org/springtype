import { IVirtualChildren, IVirtualNode } from "./ivirtual-node";
import { IElement } from "./ielement";
import { ILifecycle } from "../../component/interface";

export interface IDOM {

  isReady(): Promise<void>;

  isRegisteredComponent(tagName: string): boolean;

  isStandardHTMLAttribute(name: string): boolean;

  getTagToUse(component: ILifecycle, virtualNode: IVirtualNode): string;

  hasElNamespace(domElement: Element): boolean;

  hasSvgNamespace(parentElement: Element, type: string): boolean;

  createComponentInstance(virtualNode: IVirtualNode, parentDomElement: IElement): any;

  updateComponentAttributes(component: ILifecycle, outerAttributes: any, virtualNode: IVirtualNode): void;

  createElementOrElements(
    virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined | string>,
    parentDomElement: Element,
    detached?: boolean
  ): Array<IElement | Text | undefined> | IElement | Text | undefined;

  createElement(
    virtualNode: IVirtualNode | undefined,
    parentDomElement: Element,
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

  hide(domElement: Element): void;
  show(domElement: Element): void;
  removeElement(domElement: Element): void;
  removeChildren(domElement: Element): void;
}
