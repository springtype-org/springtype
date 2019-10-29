import { IVirtualNode } from "../../vdom/interface";
import { RenderStyleFunction } from "./icomponent";

export interface IComponentOptions {

  // function that returns TSX
  tpl?: (componentInstance?: any) => IVirtualNode;

  // function that returns a template string of CSS
  tss?: RenderStyleFunction;

  // tag name for the DOM to use, defaults to: camelCaseToKebabCase(componentClassName)
  tagName?: string;
}
