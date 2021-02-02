import { IVirtualChildren, IVirtualNode } from './ivirtual-node';
import { IElement } from './ielement';

export interface IDOM {
  hasElNamespace(domElement: Element): boolean;

  hasSvgNamespace(parentElement: Element, type: string): boolean;

  createElementOrElements(
    virtualNode: IVirtualNode | undefined | Array<IVirtualNode | undefined | string>,
    parentDomElement?: Element,
  ): Array<IElement | Text | undefined> | IElement | Text | undefined;

  createElement(virtualNode: IVirtualNode | undefined, parentDomElement?: Element): IElement | undefined;

  createTextNode(text: string, parentDomElement?: Element): Text;

  createChildElements(
    virtualChildren: IVirtualChildren,
    parentDomElement?: Element,
  ): Array<IElement | Text | undefined>;

  setAttribute(name: string, value: any, parentDomElement: Element, forceNative?: boolean): void;

  setAttributes(attributes: any, parentDomElement: Element, forceNative?: boolean): void;
}
