import { IComponentOptions } from "./icomponent-options";
import { IRefs } from "../../../core/ref/interface/iref";

export interface IComponentAttributes {
  [name: string]: string;
}

export interface IComponentInternals {

  // storage of attributes set when changing an @attr
  // or calling this.setAttribute(...)
  attributes: IComponentAttributes;

  // what goes into @component(...)
  options: IComponentOptions;

  // @ref storage
  refs: IRefs;

  // storage for pre-rendered stage class and style settings
  class: string | Array<string>;

  // the backing cache for this.style = { ... }
  style: Partial<CSSStyleDeclaration>;

  // the backing cache for this.id = "foo123"
  id: string | null;

  // the backing cache for this.key (useful for unique element identification in lists)
  key: string | null;

  // the backing cache for this.tabIndex = "2"
  tabIndex: number;

  // runtime flags
  notInitialRender: boolean;
  isConnected: boolean;
  hasDOMChanged: boolean;
}
