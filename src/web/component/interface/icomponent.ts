import { ISlotChildren } from '../../vdom/interface/ivirtual-node';
import { IComponentOptions } from "./icomponent-options";

export { IComponent } from "../component";

export interface IComponentInternals {
  el: HTMLElement;
  notInitialRender: boolean;
  attributes: {
    [name: string]: string;
  };
  options: IComponentOptions;
  isConnected: boolean;
  slotChildren: ISlotChildren;
}

export type RenderStyleFunction = (instance: any, theme?: any) => string;

export const COMPONENT_OPTIONS: unique symbol = Symbol("COMPONENT_OPTIONS");
export const INTERNAL: unique symbol = Symbol("INTERNAL");
