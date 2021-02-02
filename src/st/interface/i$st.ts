import { IDOM } from '../../vdom/interface/idom';
import { IElement } from '../../vdom/interface/ielement';
import { IVirtualNode } from '../../vdom/interface/ivirtual-node';

/**
 * public $st and internal st API
 */
export interface I$st {
  // DOM mutation abstraction
  dom: IDOM;

  // arbitrary state store
  state: any;

  render: (
    virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>,
    parentDomElement?: IElement,
  ) => Array<IElement | Text | undefined> | IElement | Text | undefined;
}
