import { st } from "../../core";
import { DEFAULT_EMPTY_PATH } from "../../core/cd/prop-change-manager";
import { ContextTrait } from "../../core/context";
import { removeContextChangeHandlersOfInstance } from "../../core/context/context";
import { GlobalCache } from "../../core/st/interface/i$st";
import { newUniqueComponentName, tsx } from "../vdom";
import { IElement, IVirtualNode } from "../vdom/interface";
import { IVirtualChild } from "../vdom/interface/ivirtual-node";
import { IComponentOptions, ILifecycle } from "./interface";
import { IComponentInternals } from "./interface/icomponent";
import { IStateChange } from "./interface/ion-state-change";
import { RenderReason, RenderReasonMetaData } from "./interface/irender-reason";
import { AttrTrait, AttrType } from "./trait/attr";
import { StateTrait } from "./trait/state";
import { TYPE_FUNCTION } from "../../core/lang/type-function";
import { TYPE_UNDEFINED } from "../../core/lang/type-undefined";
import { IRefAttribute } from "./interface/iref-attribute";
import { CLASS_ATTRIBUTE_NAME, STYLE_ATTRIBUTE_NAME, DEFAULT_SLOT_NAME } from "../vdom/dom";
import { ContextStateTrait } from "./trait/context-state";
import { StoreTrait } from "./trait/store";
import { MessageTrait } from "./trait/message";

export type DefaultComponentAttributes = {
  tag?: string; // allows to set a custom .el tag
  key?: string; // DOM intransparent primary key for list-like DOM structures
  ref?: IRefAttribute; // references DOM elements in component properties (@ref)
  unwrap?: boolean; // a DOM node tagged like that will disappear and it's child node(s) take it's place

  // the following attributes are just passed down to .el automatically
  id?: string;
  tabIndex?: number;
  style?: Partial<JSX.CSSStyleDeclaration>;
  class?: Array<string> | string;
} & JSX.DOMAttributes /* like onClick, ... -- passed down to .el automatically */;

export class Component<A = {}> implements ILifecycle {

  // shadow functionallity that shouldn't break userland impl.
  INTERNAL: IComponentInternals;

  // typing for JSX.ElementClass @attr's
  attrs!: A & DefaultComponentAttributes;

  el!: HTMLElement;
  parent!: ILifecycle;
  virtualNode!: IVirtualNode;
  childComponents!: Array<ILifecycle>;
  mutationObserver!: MutationObserver;

  tag!: string;
  ref!: IRefAttribute;
  unwrap!: boolean;
  tabIndex!: number | string;

  constructor() {
    // internal state initialization
    this.INTERNAL = {
      notInitialRender: false,
      attributes: {},
      options: Object.getPrototypeOf(this).constructor.COMPONENT_OPTIONS,
      resolveOnInitiallyRendered: () => { },
    } as IComponentInternals;

    // @state impl.
    StateTrait.enableFor(this);

    // @attr impl.
    AttrTrait.enableFor(this);

    // @context impl.
    ContextTrait.enableFor(this);

    // @store
    StoreTrait.enableFor(this);

    // .onMessage / .sendMessage()
    MessageTrait.enableFor(this);

    // register with global instance registry
    st[GlobalCache.COMPONENT_INSTANCES].push(this);
  }

  // --- standard HTML attributes (pass-thru)

  get class(): string | Array<string> {
    return this.INTERNAL[CLASS_ATTRIBUTE_NAME] || [];
  }

  set class(classes: string | Array<string>) {
    classes = !Array.isArray(classes) ? [classes] : classes;
    this.INTERNAL[CLASS_ATTRIBUTE_NAME] = classes;
    if (this.el) {
      st.dom.setAttribute(CLASS_ATTRIBUTE_NAME, classes, this.el, true)
    }
  }

  get style(): Partial<JSX.CSSStyleDeclaration> {
    return this.INTERNAL[STYLE_ATTRIBUTE_NAME] || {};
  }

  set style(style: Partial<JSX.CSSStyleDeclaration>) {
    this.INTERNAL[STYLE_ATTRIBUTE_NAME] = style;
    if (this.el) {
      st.dom.setAttribute(STYLE_ATTRIBUTE_NAME, style, this.el, true)
    }
  }

  renderSlot(slotName: string, defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualChild | Array<IVirtualChild> {
    if (this.virtualNode.slotChildren![slotName]) {
      return (this.virtualNode.slotChildren![slotName] as IVirtualNode).children;
    }
    return defaults || <fragment />;
  }

  renderChildren(defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualNode | Array<IVirtualNode> {
    if (this.virtualNode.slotChildren![DEFAULT_SLOT_NAME]) {
      return this.virtualNode.slotChildren![DEFAULT_SLOT_NAME];
    }
    return defaults || <fragment />;
  }

  onBeforeElCreate(virtualNode: IVirtualNode) { }

  onAfterElCreate(el: IElement) { }

  onBeforeElChildrenCreate() { }

  onAfterElChildrenCreate() { }

  onBeforeConnect() { }

  onMessage(topic: string, value: any) {}

  sendMessage(topic: string, value: any): void {
    st.publish(topic, value);
  }

  // internal web component standard method
  connectedCallback() {
    this.INTERNAL.isConnected = true;

    awaitDisconnect(this);

    this.onConnect();

    if (this.shouldRender(RenderReason.INITIAL)) {
      this.doRender();
    }
  }

  onConnect() { }
  onDisconnect() { }

  /**
   * Lifecycle method: Implement this method to dynamically accept or revoke attribute changes
   * @param name Name of the attribute
   * @param newValue Value to accept or revoke
   * @param oldValue Previous value
   */
  shouldAttributeChange(name: string, newValue: any, oldValue: any): boolean {
    return true;
  }

  /**
   * Overriding this method and not calling the super method
   * allows to fetch the original attribute value from VDOM (no DOM traversal string typecast)
   */
  getAttribute(name: string, type?: AttrType): any {
    // in case of DOM transparency and post-render time, the truth is the DOM
    if (type === AttrType.DOM_TRANSPARENT && this.el) {
      return this.el.getAttribute(name);
    }
    return this.INTERNAL.attributes[name];
  }


  /**
   * Overriding this method and not calling the super method
   * allows to take the original attribute value from VDOM (no DOM traversal string typecast)
   */
  setAttribute(name: string, value: any, type?: AttrType): void {
    const prevValue = this.getAttribute(name, type);

    if (
      this.shouldAttributeChange(name, value, prevValue)
    ) {

      // store internal attribute state value
      this.INTERNAL.attributes[name] = value;

      if (this.el) {
        // standard HTML attribute as per definition
        if ((st.dom.isStandardHTMLAttribute(name) ||
          // type set on call of setAttribute as AttrType.DOM_TRANSPARENT
          (typeof type !== TYPE_UNDEFINED && type === AttrType.DOM_TRANSPARENT) ||
          // @attr(AttrType.DOM_TRANSPARENT)
          AttrTrait.getType(this, name) === AttrType.DOM_TRANSPARENT)) {

          // reflect to DOM (casts to string)
          this.el.setAttribute(name, value);

          // persist for re-renderings???
          this.virtualNode.attributes[name] = value;
        }
      }

      if (
        // don't reflow if it's the first render cycle (because attribute rendering is covered with first full render cycle)

        this.INTERNAL.notInitialRender &&
        // and don't render if the user land condition denies
        this.shouldRender(RenderReason.ATTRIBUTE_CHANGE, {
          path: DEFAULT_EMPTY_PATH,
          name,
          value,
          prevValue,
        })
      ) {
        this.doRender();
      }

      // call lifecycle method
      this.onAttributeChange(name, value, prevValue);
    }
  }

  onStateChange(name: string, change: IStateChange) { }

  /**
   * Lifecycle method: Implement to get notified when attributes change
   */
  onAttributeChange(name: string, newValue: any, oldValue: any) { }


  shouldRender(reason: RenderReason, meta?: RenderReasonMetaData): boolean {
    return true;
  }

  onBeforeRender() { }

  render(): IVirtualNode | Array<IVirtualNode> | string {
    if (typeof this.INTERNAL.options.tpl! != TYPE_FUNCTION) {
      return <fragment />;
    }
    return this.INTERNAL.options.tpl!(this);
  }

  async doRender() {

    if (!this.INTERNAL) {
      this.disconnectedCallback();
      return;
    }

    this.onBeforeRender();

    // reset
    this.INTERNAL.hasDOMChanged = false;

    if (!this.INTERNAL.notInitialRender) {
      // call lifecycle method
      this.onBeforeInitialRender();
    }

    const vdom: IVirtualNode | Array<IVirtualNode> | string = this.render();

    if (!vdom) {
      throw new Error(`The render() method or the template (tpl) of <${this.constructor.name} /> must return virtual nodes.`);
    }

    const nodesToRender = Array.isArray(vdom) ? [...vdom!] : [vdom!];

    if (!this.INTERNAL.notInitialRender) {

      this.INTERNAL.hasDOMChanged = true;
      this.INTERNAL.notInitialRender = true;

      // if there isn't a prev. VDOM state, render initially
      st.renderer.renderInitial(nodesToRender, (this.el as unknown) as IElement);

      // resolve promises for calls on this.initiallyRendered()
      this.INTERNAL.resolveOnInitiallyRendered();

      // @contextState impl.
      ContextStateTrait.enableFor(this);

      // call lifecycle method
      this.onAfterInitialRender();
    } else {

      // differential VDOM / DOM rendering algorithm

      // algorithm will decide for this.INTERNAL.hasDOMChanged internally
      st.renderer.patch((this.el as any).childNodes, nodesToRender, (this.el as unknown) as IElement);
    }

    // call lifecycle method
    this.onAfterRender(this.INTERNAL.hasDOMChanged);
  }

  onBeforeInitialRender() { }

  onAfterInitialRender() { }

  onAfterRender(hasDOMChanged: boolean) { }

  onBeforePatchEl() { }

  onAfterPatchEl() { }

  onAfterRefChange(refName: string, refValue: any) { }

  dispatchEvent<D>(eventName: string, init?: CustomEventInit<any> & { detail: D }) {
    this.el.dispatchEvent(new CustomEvent(eventName.toLowerCase(), init));
  }

  async initiallyRendered(): Promise<void> {
    if (this.el) return Promise.resolve();
    return new Promise((resolve: Function) => {
      this.INTERNAL.resolveOnInitiallyRendered = resolve;
    });
  }

  disconnectedCallback() {

    if (this.INTERNAL) {
      this.INTERNAL.isConnected = false;
    }

    this.onDisconnect();

    console.log('disable messaging in disconnect')
    MessageTrait.disableFor(this);

    // purge from global instance registry
    // (e.g. doesn't retrigger render on TSS theme change)
    const index = st[GlobalCache.COMPONENT_INSTANCES].indexOf(this);
    if (index > -1) {
      st[GlobalCache.COMPONENT_INSTANCES].splice(index, 1);
    }

    // remove @context handlers
    removeContextChangeHandlersOfInstance(this);

    if (this.INTERNAL && this.INTERNAL.refs) {
      // reset @ref references
      for (let refName in this.INTERNAL.refs) {

        // @ts-ignore
        if (this.INTERNAL.refs[refName]) {

          // sub-component GC
          // @ts-ignore
          disconnectComponent(this.INTERNAL.refs[refName]);
          // GC
          // @ts-ignore
          delete this.INTERNAL.refs[refName];
        }
      }
    }

    // GC

    if (this.el) {
      // @ts-ignore
      delete this.el.$stComponent;
      // @ts-ignore
      delete this.el.$stComponentRef;
      delete this.el;
    }

    delete this.mutationObserver;

    delete this.virtualNode;
    delete this.parent;
    delete this.childComponents;
    delete this.INTERNAL;
  }
}


if (!st.component) {
  st.component = Component;
} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module component is loaded twice. Check for duplicate famework import!');
  }
}

export const getComponent = (className: string) => st[GlobalCache.COMPONENT_REGISTRY][className] as any;

export const disconnectComponent = (component: Component<any>) => {

  if (component.INTERNAL) {

    if (component.mutationObserver) {
      component.mutationObserver.disconnect();
    }

    if (component.childComponents) {
      for (let childComponent of component.childComponents) {
        disconnectComponent(childComponent as Component);
      }
    }
    component.disconnectedCallback();
  }
}

const awaitDisconnect = (component: Component<any>) => {

  const onMutation = (mutationsList: Array<MutationRecord>) => {
    for (let mutation of mutationsList) {
      if (!component.INTERNAL || !component.el) continue;

      if (Array.prototype.indexOf.call(mutation.removedNodes, component.el) > -1) {
        disconnectComponent(component);
      }
    }
  };

  if (typeof MutationObserver !== TYPE_UNDEFINED) {

    // attached component
    if (component.el.parentNode) {

      // old browsers might not call .onDisconnect() and lead to memory overhead
      // but that is a compromise that seems to be sane
      // if necessary, add: mutationobserver-shim in your application bundle
      component.mutationObserver = new MutationObserver(onMutation);
      component.mutationObserver.observe(component.el.parentNode!, { attributes: false, childList: true, subtree: false });
    } else {

      // some intermediate disconnection state
      // make sure, GC is running
      disconnectComponent(component);
    }
  }
};

if (!st.getComponent) {
  st.getComponent = getComponent;
}

export const defineComponent = (targetClassOrFunction: any, options: IComponentOptions = {}) => {

  const componentIdent = targetClassOrFunction.name || newUniqueComponentName();

  // register with element registry
  st[GlobalCache.COMPONENT_REGISTRY][componentIdent] = targetClassOrFunction;
  st[GlobalCache.COMPONENT_WEAKMAP].set(targetClassOrFunction, componentIdent);

  // assign options to be used in CustomElement derived class constructor
  targetClassOrFunction.COMPONENT_OPTIONS = options;

  // return enhanced class / function
  return targetClassOrFunction;
};
