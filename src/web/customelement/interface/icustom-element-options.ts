import { IVirtualNode } from "../../vdom/interface";
import { RenderStyleFunction } from "./icustom-html-element";

export interface ICustomElementOptions {
  tpl?: (customElementInstance?: any) => IVirtualNode;
  tss?: RenderStyleFunction;
}
