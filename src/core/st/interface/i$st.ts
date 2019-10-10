import { ICustomElementInstances, ICustomHTMLElement } from "../../../web/customelement/interface";
import { IRouter } from "../../../web/router/interface";
import { ITSS } from "../../../web/tss/interface";
import { IDOM, IGetDomRef, IRenderer, ISetDomRef, IVirtualChildren, IVirtualNode, IVirtualNodeType } from "../../../web/vdom/interface";
import { IOnDeepChangeHandler } from "../../cd/interface";
import { IDI } from "../../di/interface";
import { Ii18n, It } from "../../i18n/interface";
import { IlogFunction } from "../../log/interface";
import { ISharedMemoryEntries } from "../../sharedmemory/interface";
import { IOnChangeHandler, IOnStateChangeHandler, StateChangeType } from "../../state/interface";

/**
 * public $st and internal st API
 */
export interface I$st {
  // adds/replaces the root DOM node in <body> with a new instance of the custom element given
  render: (customElementClassRef: any, attributes?: Partial<typeof customElementClassRef>) => void;
  // enables trace mode (internal framework log messages)
  debug: boolean;
  // DOM routing
  router: IRouter;

  // dependency injection
  di: IDI;

  // internationalization (i18n), translation
  i18n: Ii18n;
  t: It;

  // TSS stylesheet renderer and theme / <style> template manager
  tss: ITSS;

  // TSX transformator function
  tsx: (type: IVirtualNodeType, attributes: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null, ...children: IVirtualChildren[]) => IVirtualNode<any>;

  // DOM mutation abstraction
  dom: IDOM;

  // initial and patch (differential) rendering
  renderer: IRenderer;

  // change detection for objects and arrays (deep changes)
  onChange: (object: any, onChange: IOnDeepChangeHandler, options: any) => any;

  // change detection with support for (deep changes + reference set changes)
  onStateChange: (instance: any, name: string | symbol, type: StateChangeType, onChange: IOnChangeHandler, onDeepChange?: IOnDeepChangeHandler) => any;

  // set and get DOM references from within @customElement classes using @ref
  getDomRef: IGetDomRef;
  setDomRef: ISetDomRef;

  // custom element base class implemenetation to inherit from
  element: ICustomHTMLElement;

  // logging
  info: IlogFunction;
  warn: IlogFunction;
  error: IlogFunction;

  // shared memory
  getShare<S = {}>(shareName: string, onChange?: IOnStateChangeHandler, instance?: any): S;

  initShare<S = {}>(shareName: string, initialValue: S, onChange?: IOnStateChangeHandler, instance?: any): S;

  addShareChangeHandler: (shareName: string, onChange: IOnStateChangeHandler, instance?: any) => void;

  removeShareChangeHandler: (sharedName: string, onChange?: IOnStateChangeHandler) => void;

  // global memory
  SHARED_MEMORY: ISharedMemoryEntries;
  CUSTOM_ELEMENT_INSTANCES: ICustomElementInstances;
}

export enum GlobalCache {
  CUSTOM_ELEMENT_INSTANCES = "CUSTOM_ELEMENT_INSTANCES",
  SHARED_MEMORY = "SHARED_MEMORY",
}
