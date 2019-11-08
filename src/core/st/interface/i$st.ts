import { IComponentRegistry } from "../../../web/component/interface";
import { IOnStateChangeHandler } from "../../../web/component/interface/ion-state-change";
import { IRouter } from "../../../web/router/interface";
import { ITSS } from "../../../web/tss/interface";
import { IDOM, IGetDomRef, IRenderer, ISetDomRef, IVirtualChildren, IVirtualNode, IVirtualNodeType } from "../../../web/vdom/interface";
import { IOnDeepChangeHandler } from "../../cd/interface";
import { ChangeType } from "../../cd/interface/change-type";
import { IOnChangeHandler } from "../../cd/interface/ion-change-handler";
import { IDI } from "../../di/interface";
import { Ii18n, It } from "../../i18n/interface";
import { IlogFunction } from "../../log/interface";
import { IComponent } from "./../../../web/component/interface";
import { IContextCacheEntries } from "./../../context/interface/icontext-cache-entries";
import { ICoreOptions } from "./icore-options";

export interface IOptions {
  core: ICoreOptions;
}

/**
 * public $st and internal st API
 */
export interface I$st {
  // --- core specific

  // enables trace mode (internal framework log messages)
  options: IOptions;

  // logging API
  info: IlogFunction;
  log: IlogFunction;
  debug: IlogFunction;
  warn: IlogFunction;
  error: IlogFunction;

  // Dependency injection API
  di: IDI;

  // Internationalization (i18n), translation API
  i18n: Ii18n;
  t: It;

  // Change detection API

  // change detection for objects and arrays (deep changes)
  onChange: (object: any, onChange: IOnDeepChangeHandler, options: any) => any;

  // change detection with support for (deep changes + reference set changes)
  onStateChange: (instance: any, name: string | symbol, type: ChangeType, onChange: IOnChangeHandler, onDeepChange?: IOnDeepChangeHandler) => any;

  // context API
  getContext<S = {}>(contextName: string, onChange?: IOnStateChangeHandler, instance?: any): S;

  initContext<S = {}>(contextName: string, initialValue: S, onChange?: IOnStateChangeHandler, instance?: any): S;

  addContextChangeHandler: (contextName: string, onChange: IOnStateChangeHandler, instance?: any) => void;

  removeContextChangeHandler: (contextName: string, onChange?: IOnStateChangeHandler) => void;

  // global cache API
  CONTEXT: IContextCacheEntries;

  // --- web specific

  // TSS stylesheet renderer and theme / <style> template manager
  tss: ITSS;

  // TSX transformator function
  tsx: (
    type: IVirtualNodeType,
    attributes: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null,
    ...children: Array<IVirtualChildren>
  ) => Array<IVirtualNode> | IVirtualNode | undefined;

  // DOM mutation abstraction
  dom: IDOM;

  // initial and patch (differential) rendering
  renderer: IRenderer;

  // DOM routing API
  router: IRouter;

  // adds/replaces the root DOM node in <body> with a new instance of the custom element given
  render: (customElementClassRef: any, attributes?: Partial<typeof customElementClassRef>) => void;

  // DOM reference API
  // set and get DOM references from within @customElement classes using @ref
  getDomRef: IGetDomRef;
  setDomRef: ISetDomRef;

  // virtual component base class implemenetation to inherit from
  component: IComponent;
  getComponent: (className: string) => IComponent;

  // components are @springtype/web components
  COMPONENT_INSTANCES: any;
  COMPONENT_REGISTRY: IComponentRegistry;
}

export enum GlobalCache {
  COMPONENT_INSTANCES = "COMPONENT_INSTANCES",
  CONTEXT = "CONTEXT",
  COMPONENT_REGISTRY = "COMPONENT_REGISTRY",
}
