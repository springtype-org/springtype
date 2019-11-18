import { ILifecycle } from "./ilifecycle";
import { IElement } from "../../vdom/interface";

export interface IRefAttribute {
  [refName: string]: ILifecycle|IElement;
};
