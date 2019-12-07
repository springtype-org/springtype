import { IAttributes } from "./iattributes";
import { ILifecycle } from "../../component/interface";

export interface IElement extends HTMLElement, IAttributes {
  children: HTMLCollection | any;
  slot: string | string;

  // returns the managing component (direct as $stComponent or as a parent by $stComponentRef)
  getComponent: () => ILifecycle;
}
