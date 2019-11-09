import { ISlotChildren } from '../../vdom/interface/ivirtual-node';
import { IComponentOptions } from "./icomponent-options";

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
