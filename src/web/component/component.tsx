import { st } from "../../core";
import { DEFAULT_EMPTY_PATH } from "../../core/cd/prop-change-manager";
import { ContextTrait } from "../../core/context";
import { removeContextChangeHandlersOfInstance } from "../../core/context/context";
import { GlobalCache } from "../../core/st/interface/i$st";
import { newUniqueComponentName, transformSlots, tsx } from "../vdom";
import { IElement, IVirtualNode } from "../vdom/interface";
import { IComponentOptions } from "./interface";
import { IComponentInternals } from "./interface/icomponent";
import { IComponentLifecycle, ILifecycle } from "./interface/ilifecycle";
import { IOnStateChange, IStateChange } from "./interface/ion-state-change";
import { RenderReason, RenderReasonMetaData } from "./interface/irender-reason";
import { AttrTrait, AttrType } from "./trait/attr";
import { StateTrait } from "./trait/state";

export class Component implements IComponentLifecycle, ILifecycle, IOnStateChange {
  // shadow functionallity that shouldn't break userland impl.
  INTERNAL: IComponentInternals;

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

  getEl(): HTMLElement {
    return this.INTERNAL.el;
  }

  onBeforeConnect() {}

  // internal web component standard method
  connectedCallback() {
    this.INTERNAL.isConnected = true;

    // TODO: remove this
    this.INTERNAL.el.classList.add(Object.getPrototypeOf(this).constructor.name);

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

    this.onDisconnect();
  }

  onBeforeDisconnect() {}

  onDisconnect() {}

  /**
   * Lifecycle method: Implement this method to dynamically accept or revoke attribute changes
   * @param name Name of the attribute
   * @param newValue Value to accept or revoke
   * @param oldValue Previous value
   */
  // @ts-ignore: Unused variables are valid here
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

      // @ts-ignore
      this.INTERNAL.attributes[name] = value;

      // @ts-ignore
      if (this.INTERNAL.el && ((typeof type !== "undefined" && type === AttrType.DOM_TRANSPARENT) || AttrTrait.getType(this, name) === AttrType.DOM_TRANSPARENT)) {
        // reflect to DOM (casts to string)

        // @ts-ignore
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

  // @ts-ignore: Unused variables are valid here
  onStateChange(change: IStateChange) {}

  /**
   * Lifecycle method: Implement to get notified when attributes change
   */
  // @ts-ignore: Unused variables are valid here
  onAttributeChange(name: string, newValue: any, oldValue: any) {}

  /**
   * Overriding this method and not calling the super method
   * allows to fetch the original attribute value from VDOM (no DOM traversal string typecast)
   */
  getAttribute(name: string): any {
    return this.INTERNAL.attributes[name];
  }

  // @ts-ignore: Unused variables are valid here
  shouldRender(reason: RenderReason, meta?: RenderReasonMetaData): boolean {
    return true;
  }

  // @ts-ignore: Unused variables are valid here
  onBeforeRender(tssOnly: boolean = false) {}

  render(): IVirtualNode | Array<IVirtualNode> {
    if (typeof this.INTERNAL.options.tpl! != "function") {
      throw new Error(`Custom element (<${this.constructor.name} />) has no render() method nor a valid template (tpl)!`);
    }
    return this.INTERNAL.options.tpl!(this);
  }

  // @ts-ignore: Unused variables are valid here
  renderStyle(theme?: any): string | undefined {
    return undefined;
  }

  async doRenderStyle(): Promise<IVirtualNode | undefined> {
    const cssText = this.INTERNAL.options.tss ? this.INTERNAL.options.tss!(this, st.tss.currentTheme) : this.renderStyle(st.tss.currentTheme);

    // TODO: Don't render a node if there is no cssText; might remove the whole API
    return <style type="text/css">{cssText}</style>;
  }

  // TODO: .el getter/setter
  // TODO: .parent getter/setter (parent component)
  // TODO: .parentEl getter/setter

  async doRender(tssOnly: boolean = false) {
    this.onBeforeRender(tssOnly);

    let vdom: IVirtualNode | Array<IVirtualNode> = this.render();
    const tss: IVirtualNode | undefined = await this.doRenderStyle();

    if (!vdom) {
      throw new Error(`The render() method or the template (tpl) of <${this.constructor.name} /> must return virtual nodes.`);
    }

    const nodesToRender = Array.isArray(vdom) ? [tss as IVirtualNode, ...vdom!] : [tss as IVirtualNode, vdom!];

    // performance-optimization: only process slots if <template> tags are found (fills slotChildren)

    if (this.INTERNAL.slotChildren) {
      vdom = transformSlots(vdom as IVirtualNode, this.INTERNAL.slotChildren);
    }

    // TODO:

    if (!this.INTERNAL.notInitialRender) {
      // if there isn't a prev. VDOM state, render initially
      st.renderer.renderInitial(
        nodesToRender,
        (this.INTERNAL.el as unknown) as IElement,
      );

      this.INTERNAL.notInitialRender = true;

      // call lifecycle method
      this.onAfterInitialRender();
    } else {
      // differential VDOM / DOM rendering algorithm
      st.renderer.patch(
        (this.INTERNAL.el as any).childNodes,
        nodesToRender,
        (this.INTERNAL.el as unknown) as IElement,
      );
    }

    // call lifecycle method
    this.onAfterRender(tssOnly);
  }

  onAfterInitialRender() {}

  // @ts-ignore: Unused variables are valid here
  onAfterRender(tssOnly: boolean = false) {}
}


if (!st.component) {
  st.component = Component;
}

export const getComponent = (className: string) => st[GlobalCache.COMPONENT_REGISTRY][className] as any;

if (!st.getComponent) {
  st.getComponent = getComponent;
}

export const defineComponent = (targetClassOrFunction: any, options: IComponentOptions = {}) => {
  // register with element registry
  st[GlobalCache.COMPONENT_REGISTRY][targetClassOrFunction.name] = targetClassOrFunction;

  // defaults the tag name
  if (!options.tagName) {
    options.tagName = targetClassOrFunction.name;
  }

  if (!options.tagName) {
    options.tagName = newUniqueComponentName();
  } 

  // assign options to be used in CustomElement derived class constructor
  targetClassOrFunction.COMPONENT_OPTIONS = options;

  // return enhanced class / function
  return targetClassOrFunction;
};
