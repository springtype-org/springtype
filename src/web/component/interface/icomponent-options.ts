import { IVirtualNode } from "../../vdom/interface";

export interface IComponentOptions {

  // function that returns TSX
  tpl?: (componentInstance?: any) => IVirtualNode;

  // which tag to use by default
  // if set, this is used in DOM instead of the constructor name
  // can also be overwritten on usage
  tag?: string;
}
