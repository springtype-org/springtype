import { st } from "../../core";
import { DEFAULT_EMPTY_PATH } from "../../core/cd/prop-change-manager";
import { ContextTrait } from "../../core/context";
import { removeContextChangeHandlersOfInstance } from "../../core/context/context";
import { GlobalCache } from "../../core/st/interface/i$st";
import { newUniqueComponentName, tsx } from "../vdom";
import { IElement, IVirtualNode } from "../vdom/interface";
import { IVirtualChild } from "../vdom/interface/ivirtual-node";
import { DEFAULT_SLOT_NAME, CLASS_ATTRIBUTE_NAME } from "../vdom/tsx";
import { IComponentOptions, IComponent } from "./interface";
import { IComponentInternals } from "./interface/icomponent";
import { IComponentLifecycle, ILifecycle } from "./interface/ilifecycle";
import { IOnStateChange, IStateChange } from "./interface/ion-state-change";
import { RenderReason, RenderReasonMetaData } from "./interface/irender-reason";
import { AttrTrait, AttrType } from "./trait/attr";
import { StateTrait } from "./trait/state";
import { TYPE_FUNCTION } from "../../core/lang/type-function";
import { TYPE_UNDEFINED } from "../../core/lang/type-undefined";
import { IRefAttribute } from "./interface/iref-attribute";

export type DefaultAttributes = {
  tag?: string;
  id?: string;
  key?: string;
  ref?: IRefAttribute;
  unwrap?: boolean;
  tabIndex?: number;
  style?: Partial<CSSStyleDeclaration>;
  class?: Array<string>|string;
}

export class Component<A = {}> implements IComponentLifecycle, ILifecycle, IOnStateChange {

  // shadow functionallity that shouldn't break userland impl.
  INTERNAL: IComponentInternals;

  // typing for JSX.ElementClass @attr's
  attrs!: A & DefaultAttributes;

  tag!: string;
  id!: string;
  key!: string;
  ref!: IRefAttribute;
  unwrap!: boolean;
  tabIndex!: number;
  style!: Partial<CSSStyleDeclaration>;
  class!: Array<string>|string;

  // class assignment for import in case of lowercase usage / typed use
  as!: IComponent;

  constructor() {
    // internal state initialization
    this.INTERNAL = {
      notInitialRender: false,
      attributes: {},
      options: Object.getPrototypeOf(this).constructor.COMPONENT_OPTIONS,
    } as IComponentInternals;

    StateTrait.enableFor(this);
    AttrTrait.enableFor(this);
    ContextTrait.enableFor(this);

    // register with global instance registry
    st[GlobalCache.COMPONENT_INSTANCES].push(this);
  }

  get el(): HTMLElement {
    return this.INTERNAL.el;
  }

  get elClass(): string | Array<string> {
    return (this.el.getAttribute(CLASS_ATTRIBUTE_NAME) || "").split(" ");
  }

  set elClass(classes: string | Array<string>) {
    st.dom.setAttribute(CLASS_ATTRIBUTE_NAME, !Array.isArray(classes) ? [classes] : classes, this.el, false, true);
  }

  get elAttributes(): Partial<HTMLElement> {
    return this.el.attributes as Partial<HTMLElement>;
  }

  set elAttributes(attributes: Partial<HTMLElement>) {
    st.dom.setAttributes(attributes, this.el, false, true);
  }

  get elStyle(): Partial<CSSStyleDeclaration> {
    return this.el.style;
  }

  set elStyle(style: Partial<CSSStyleDeclaration>) {
    st.dom.setAttribute("style", style, this.el, false, true);
  }

  get parentEl(): HTMLElement {
    return this.INTERNAL.parentEl;
  }

  get parent(): ILifecycle {
    return this.INTERNAL.parent;
  }

  get virtualNode(): IVirtualNode {
    return this.INTERNAL.virtualNode;
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

  onBeforeElCreate(virtualNode: IVirtualNode) {}

  onAfterElCreate(el: IElement) {}

  onBeforeElChildrenCreate() {}

  onAfterElChildrenCreate() {}

  onBeforeConnect() {}

  // internal web component standard method
  connectedCallback() {
    this.INTERNAL.isConnected = true;

    awaitDisconnect(this);

    this.onConnect();

    if (this.shouldRender(RenderReason.INITIAL)) {
      this.doRender();
    }
  }

  onConnect() {}

  disconnectedCallback() {
    this.INTERNAL.isConnected = false;

    // evict from global instance registry
    // (e.g. doesn't retrigger render on TSS theme change)
    let index = st[GlobalCache.COMPONENT_INSTANCES].indexOf(this);
    if (index > -1) {
      st[GlobalCache.COMPONENT_INSTANCES].splice(index, 1);
    }

    // remove @context handlers
    removeContextChangeHandlersOfInstance(this);

    // reset ref-references
    for (let refName in this.ref) {
      // @ts-ignore
      this.ref[refName] = null;
    }
    this.onDisconnect();
  }

  onDisconnect() {}

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
   * allows to take the original attribute value from VDOM (no DOM traversal string typecast)
   */
  setAttribute(name: string, value: any, type?: AttrType): void {
    const prevValue = this.INTERNAL.attributes[name];

    if (
      prevValue !== value && // ignore if not changed (scalar)
      this.shouldAttributeChange(name, value, prevValue)
    ) {
      // store internal attribute state value

      this.INTERNAL.attributes[name] = value;

      if (this.INTERNAL.el && ((typeof type !== TYPE_UNDEFINED && type === AttrType.DOM_TRANSPARENT) || AttrTrait.getType(this, name) === AttrType.DOM_TRANSPARENT)) {
        // reflect to DOM (casts to string)

        this.INTERNAL.el.setAttribute(name, value);
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

  onStateChange(change: IStateChange) {}

  /**
   * Lifecycle method: Implement to get notified when attributes change
   */
  onAttributeChange(name: string, newValue: any, oldValue: any) {}

  /**
   * Overriding this method and not calling the super method
   * allows to fetch the original attribute value from VDOM (no DOM traversal string typecast)
   */
  getAttribute(name: string): any {
    return this.INTERNAL.attributes[name];
  }

  shouldRender(reason: RenderReason, meta?: RenderReasonMetaData): boolean {

    // TODO: Implement standard model to prevent render without changes
    console.log('shouldRender', this);
    return true;
  }

  onBeforeRender() {}

  render(): IVirtualNode | Array<IVirtualNode> {
    if (typeof this.INTERNAL.options.tpl! != TYPE_FUNCTION) {
      throw new Error(`Custom element (<${this.constructor.name} />) has no render() method nor a valid template (tpl)!`);
    }
    return this.INTERNAL.options.tpl!(this);
  }

  async doRender() {
    this.onBeforeRender();

    let vdom: IVirtualNode | Array<IVirtualNode> = this.render();

    if (!vdom) {
      throw new Error(`The render() method or the template (tpl) of <${this.constructor.name} /> must return virtual nodes.`);
    }

    const nodesToRender = Array.isArray(vdom) ? [...vdom!] : [vdom!];

    // performance-optimization: only process slots if <template> tags are found (fills slotChildren)

    /* SLOT
    if (this.INTERNAL.virtualSlotChildren) {
      vdom = transformSlots(vdom as IVirtualNode, this.INTERNAL.virtualSlotChildren);
    }
    */

    if (!this.INTERNAL.notInitialRender) {
      // if there isn't a prev. VDOM state, render initially
      st.renderer.renderInitial(nodesToRender, (this.INTERNAL.el as unknown) as IElement);

      this.INTERNAL.notInitialRender = true;

      // call lifecycle method
      this.onAfterInitialRender();
    } else {
      // differential VDOM / DOM rendering algorithm
      st.renderer.patch((this.INTERNAL.el as any).childNodes, nodesToRender, (this.INTERNAL.el as unknown) as IElement);
    }

    // call lifecycle method
    this.onAfterRender();
  }

  onAfterInitialRender() {}

  onAfterRender() {}

  onBeforePatchEl() {}

  onAfterPatchEl() {}

  handleUpdateElAttribute(name: string, value: any) {}
}

if (!st.component) {
  st.component = Component;
}

export const getComponent = (className: string) => st[GlobalCache.COMPONENT_REGISTRY][className] as any;

const awaitDisconnect = (component: Component<any>) => {
  const onMutation = (mutationsList: Array<MutationRecord>, observer: MutationObserver) => {
    for (let mutation of mutationsList) {
      if (Array.prototype.indexOf.call(mutation.removedNodes, component.el) > -1) {
        component.disconnectedCallback();
        observer.disconnect();
      }
    }
  };

  if (typeof MutationObserver !== TYPE_UNDEFINED) {
    // old browsers might not call .onDisconnect() and lead to memory overhead
    // but that is a compromise that seems to be sane
    // if necessary, add: mutationobserver-shim in your application bundle
    component.INTERNAL.mutationObserver = new MutationObserver(onMutation);
    component.INTERNAL.mutationObserver.observe(component.parentEl, { attributes: false, childList: true, subtree: false });
  }
};

if (!st.getComponent) {
  st.getComponent = getComponent;
}

export const defineComponent = (targetClassOrFunction: any, options: IComponentOptions = {}) => {

  // register with element registry
  st[GlobalCache.COMPONENT_REGISTRY][targetClassOrFunction.name] = targetClassOrFunction;

  // defaults the tag name
  if (!options.tag) {
    options.tag = targetClassOrFunction.name;
  }

  if (!options.tag) {
    options.tag = newUniqueComponentName();
  }

  // assign options to be used in CustomElement derived class constructor
  targetClassOrFunction.COMPONENT_OPTIONS = options;

  // return enhanced class / function
  return targetClassOrFunction;
};
