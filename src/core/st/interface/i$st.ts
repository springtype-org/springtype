import { IComponentRegistry } from "../../../web/component/interface";
import { IOnStateChangeHandler } from "../../../web/component/interface/ion-state-change";
import { IDOM, IRenderer, IVirtualChildren, IVirtualNode, IVirtualNodeType } from "../../../web/vdom/interface";
import { IOnDeepChangeHandler } from "../../cd/interface";
import { ChangeType } from "../../cd/interface/change-type";
import { IOnChangeHandler } from "../../cd/interface/ion-change-handler";
import { IDI } from "../../di/interface";
import { IlogFunction } from "../../log/interface";
import { IComponent } from "./../../../web/component/interface";
import { IContextCacheEntries } from "./../../context/interface/icontext-cache-entries";
import { IRouter, IRouteMatch } from "../../../web/router/interface";
import { IFormatter } from "../../formatter/interface/iformatter";
import { IFormat } from "../../formatter/interface/iformat";
import { IAddFomratter } from "../../formatter/interface/iadd-formatter";
import { IAddTranslation } from "../../i18n/interface/iadd-translation";
import { ISetLanguage } from "../../i18n/interface/iset-language";
import { Ii18n } from "../../i18n/interface/ii18n";
import { It } from "../../i18n/interface/it";
import { IPubSub } from "../../pubsub/interface";
import { IPublish } from "../../pubsub/interface/ipublish";
import { ISubscribe } from "../../pubsub/interface/isubscribe";
import { Store } from "../../redux/interface/store";
import { Action, AnyAction } from "../../redux/interface/actions";

/**
 * public $st and internal st API
 */
export interface I$st {

  // nop function, only to import modules
  enable: (...implReferences: any) => void;

  // runs async micro-tasks
  run: (fn: Function) => Promise<void>;

  // --- platform global reference
  // node: global, browser: window
  globalThis: any;

  // logging: print to the console
  info: IlogFunction;
  log: IlogFunction;
  debug: IlogFunction;
  warn: IlogFunction;
  error: IlogFunction;

  // dependency injection: get instances of classes using predefined strategies and without using "new"
  di: IDI;
  inject: (targetClass: any) => any;

  // formatter
  formatter: IFormatter;
  format: IFormat;
  addFormatter: IAddFomratter;

  // internationalization (i18n): translate text using JSON based translation files and formatting functions
  i18n: Ii18n;
  t: It;
  addTranslation: IAddTranslation;
  setLanguage: ISetLanguage;

  // change detection: events/listeners for changes on objects (state)

  // change detection for objects and arrays (deep changes)
  onChange: (object: any, onChange: IOnDeepChangeHandler, options: any) => any;

  // change detection with support for (deep changes + reference set changes)
  onStateChange: (instance: any, name: string | symbol, type: ChangeType, onChange: IOnChangeHandler, onDeepChange?: IOnDeepChangeHandler) => any;

  // context: Global store to share state with change detection and change events/listeners

  // global context cache
  CONTEXT: IContextCacheEntries;
  context<S = {}>(contextName: string, initialValue?: S, onChange?: IOnStateChangeHandler, instance?: any): S;
  addContextChangeHandler: (contextName: string, onChange: IOnStateChangeHandler, instance?: any) => void;
  removeContextChangeHandler: (contextName: string, onChange?: IOnStateChangeHandler) => void;

  // --- web specific

  // TSX transformator function
  tsx: (
    type: IVirtualNodeType,
    attributes: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null,
    ...children: Array<IVirtualChildren>
  ) => Array<IVirtualNode> | IVirtualNode | undefined;

  // adds/replaces a global <style> element for dynamic CSS injection
  style: (name: string, definition: string) => HTMLStyleElement;

  // DOM mutation abstraction
  dom: IDOM;

  // initial and patch (differential) rendering
  renderer: IRenderer;

  // DOM routing
  router: IRouter;
  route: Partial<IRouteMatch>;

  // renders a virtual node directly into an existing DOM node, defaults to document.body
  render: (virtualNode: IVirtualNode, domNode?: Element) => void;

  // fires a custom DOM event
  event: <D>(instance: Node, eventName: string, init?: (CustomEventInit<any> & { detail: D; }) | undefined) => void;

  // referencing

  // set and get reference and their data on any object, specifically on VDOM elements
  ref: (refName: string, componentInstance: any, data?: any) => any;

  // virtual component base class implemenetation to inherit from
  component: IComponent;
  staticComponent: IComponent;
  getComponent: (className: string) => IComponent;

  // bus / publish / subscribe
  pubsub: IPubSub;
  publish: IPublish<any>;
  subscribe: ISubscribe<any>;
  // same interface as subscribe, reverse logic
  unsubscribe: ISubscribe<any>;

  // redux redux support using @redux
  getStore: <S = any, A extends Action<any> = AnyAction>() => Store<S, A>;
  setStore: <S = any, A extends Action<any> = AnyAction>(store: Store<S, A>) => void;

  // components are @springtype/web components
  COMPONENT_INSTANCES: any;
  COMPONENT_REGISTRY: IComponentRegistry;
  COMPONENT_WEAKMAP: WeakMap<Function, string>;
}

export enum GlobalCache {
  COMPONENT_INSTANCES = "COMPONENT_INSTANCES",
  CONTEXT = "CONTEXT",
  COMPONENT_REGISTRY = "COMPONENT_REGISTRY",
  COMPONENT_WEAKMAP = "COMPONENT_WEAKMAP"
}
