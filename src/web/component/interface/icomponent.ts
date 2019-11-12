import { IVirtualNode } from "./../../../web/vdom/interface/ivirtual-node";
import { IComponentOptions } from "./icomponent-options";
import { ILifecycle } from "./ilifecycle";

export interface IComponentInternals {
  el: HTMLElement;
  parentEl: HTMLElement;
  parent: ILifecycle;
  notInitialRender: boolean;
  attributes: {
    [name: string]: string;
  };
  options: IComponentOptions;
  isConnected: boolean;
  virtualNode: IVirtualNode;
  mutationObserver: MutationObserver;
}
