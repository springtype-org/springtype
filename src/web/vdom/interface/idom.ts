import { IVirtualChildren, IVirtualNode } from "./ivirtual-node";

export interface IDOMRootAttributes {
  //name: string]: string;
}

export interface IDOM {

  isReady(): Promise<void>;

  isRegisteredComponent(tagName: string): boolean;

  isStandardHTMLAttribute(name: string): boolean;

  hasElNamespace(domElement: Element): boolean;

  hasSvgNamespace(parentElement: Element, type: string): boolean;

  createElement(virtualNode: IVirtualNode | undefined, parentDomElement: Element): Element | undefined;

  createTextNode(text: string, parentDomElement: Element): void;

  createChildElements(virtualChildren: IVirtualChildren, parentDomElement: Element): void;

  setAttribute(name: string, value: any, parentDomElement: Element, forceNative?: boolean): void;

  setAttributes(attributes: any, parentDomElement: Element, forceNative?: boolean): void;
}
