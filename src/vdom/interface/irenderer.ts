import { IElement } from "./ielement";
import { IVirtualNode } from "./ivirtual-node";

export interface IRenderer {

  render(
    virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>,
    parentDomElement: IElement,
  ): Array<IElement | Text | undefined> | IElement | Text | undefined;
}
