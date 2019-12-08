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

  createElementOrElements(
    virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined>,
    parentDomElement: Element,
    detached?: boolean
  ): Array<IElement | Text | undefined> | IElement | undefined;

  createElement(
    virtualNode: IVirtualNode | undefined,
    parentDomElement: Element,
    detached?: boolean): IElement | undefined;

  createTextNode(
    text: string,
    parentDomElement: Element,
    detached?: boolean
  ): Text;

  createChildElements(
    virtualChildren: IVirtualChildren,
    parentDomElement: Element,
    detached?: boolean
  ): Array<IElement | Text | undefined>;

  setAttribute(name: string, value: any, parentDomElement: Element, forceNative?: boolean): void;

  setAttributes(attributes: any, parentDomElement: Element, forceNative?: boolean): void;
}
