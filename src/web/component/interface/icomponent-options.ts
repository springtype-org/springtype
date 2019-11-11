import { IVirtualNode } from "../../vdom/interface";

export interface IComponentOptions {

  // function that returns TSX
  tpl?: (componentInstance?: any) => IVirtualNode;

  // tag name for the DOM to use, defaults to: camelCaseToKebabCase(componentClassName)
  tagName?: string;
}
