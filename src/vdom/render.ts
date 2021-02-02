import { st } from '../st/st';
import { IElement } from './interface/ielement';
import { IVirtualNode } from './interface/ivirtual-node';
import './dom';

export const render = (st.render = (
  virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>,
  parentDomElement: IElement = document.body,
): Array<IElement | Text | undefined> | IElement | Text | undefined => {
  if (typeof virtualNode === 'string') {
    return st.dom.createTextNode(virtualNode, parentDomElement);
  }
  return st.dom.createElementOrElements(virtualNode, parentDomElement);
});
