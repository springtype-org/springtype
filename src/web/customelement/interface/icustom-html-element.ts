import { ITypedStyleSheet } from "../../tss/interface";
import { ICustomElementOptions } from "./icustom-element-options";

export { ICustomHTMLElement } from "../custom-html-element";

export interface ICustomHTMLElementInternals {
  root: ShadowRoot | HTMLElement;
  notInitialRender: boolean;
  attributes: {
    [name: string]: string;
  };
  options: ICustomElementOptions;
}

export type RenderStyleFunction = (instance: any, theme?: any) => ITypedStyleSheet;

export const CUSTOM_ELEMENT_OPTIONS: unique symbol = Symbol("CUSTOM_ELEMENT_OPTIONS");
export const TAG_NAME: any = Symbol("TAG_NAME");
export const ATTRS: unique symbol = Symbol("ATTRS");
export const INTERNAL: unique symbol = Symbol("INTERNAL");
