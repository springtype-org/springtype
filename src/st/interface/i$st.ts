import { IVirtualNode, IElement } from "../..";
import { IDOM } from "../../vdom/interface/idom";

/**
 * public $st and internal st API
 */
export interface I$st {

  // --- platform global reference
  // node: global, browser: window
  globalThis: any;

  // DOM mutation abstraction
  dom: IDOM;

  // a subset of the DOM API is needed for DOM sync and SSR hydration
  domImpl: Partial<Window>;

  // arbitrary state store
  state: any;

  render: (
  virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>,
  parentDomElement?: IElement,
) => Array<IElement | Text | undefined> | IElement | Text | undefined;
}
