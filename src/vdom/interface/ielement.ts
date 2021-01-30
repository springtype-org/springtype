import { IAttributes } from "./iattributes";

export interface IElement extends HTMLElement, IAttributes {
  children: HTMLCollection | any;
}
