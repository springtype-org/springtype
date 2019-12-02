import { IComponent } from "../../../web/component/interface";
import { IElement } from "../../../web/vdom/interface";

export type RefFn = (...args: any) => any;
export type Ref = IComponent | IElement;

export interface IRefs {
  [name: string]: Ref;
}
