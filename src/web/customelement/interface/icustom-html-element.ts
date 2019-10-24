import { ISlotChildren } from './../../vdom/interface/ivirtual-node';
import { ICustomElementOptions } from "./icustom-element-options";

export { ICustomHTMLElement } from "../custom-html-element";

export interface ICustomHTMLElementInternals {
  root: HTMLElement;
  notInitialRender: boolean;
  attributes: {
    [name: string]: string;
  };
  options: ICustomElementOptions;
  isConnected: boolean;
  slotChildren: ISlotChildren;
}

export type RenderStyleFunction = (instance: any, theme?: any) => string;

export const CUSTOM_ELEMENT_OPTIONS: unique symbol = Symbol("CUSTOM_ELEMENT_OPTIONS");
export const INTERNAL: unique symbol = Symbol("INTERNAL");
