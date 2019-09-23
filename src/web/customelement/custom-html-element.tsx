import { st } from "../../core";
import { IOnPropChange, IPropChange } from "../../core/cd/interface";
import { PropChangeManager, PROPS } from "../../core/cd/prop-change-manager";
import { removeSharedMemoryChangeHandlersOfInstance } from "../../core/sharedmemory/share";
import { ITypedStyleSheet } from "../tss/interface";
import { tsx } from "../vdom";
import { IElement, IVirtualNode } from "../vdom/interface";
import { CustomElementManager, CUSTOM_ELEMENT_OPTIONS } from "./custom-element-manager";
import { ICustomElementOptions } from "./interface";
import { ILifecycle, RenderReason, RenderReasonMetaData } from "./interface/ilifecycle";

export class CustomHTMLElement extends HTMLElement implements ILifecycle, IOnPropChange {
  _root: ShadowRoot | HTMLElement | undefined = undefined;
  _notInitialRender: boolean = false;
  _connected: boolean = false;
  _callOnConnect: Array<Function> = [];

  constructor() {
    super();

    // init @prop support
    PropChangeManager.initProps(this, Object.getPrototypeOf(this).constructor[PROPS] || []);

    // register with global instance registry
    CustomElementManager.addInstance(this);

    const options: ICustomElementOptions = Object.getPrototypeOf(this).constructor[CUSTOM_ELEMENT_OPTIONS];

    // default render root is this custom element instance
    this._root = this;

    // in case of "open" or "closed" shadow DOM, use shadow DOM root node
    if (options.shadowMode != "none" && !this.shadowRoot) {
      this._root = this.attachShadow({
        mode: options.shadowMode as ShadowRootMode,
      });
    }
  }

  onBeforeConnect() {}

  // internal web component standard method
  connectedCallback() {
    this._connected = true;

    for (let onConnect of this._callOnConnect) {
      onConnect();
    }

    this.onConnect();

    if (this.shouldRender(RenderReason.INITIAL)) {
      this.doRender();
    }
  }

  async whenConnected() {
    if (this._connected) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      this._callOnConnect.push(resolve);
    });
  }

  onConnect() {}

  disconnectedCallback() {
    // evict from global instance registry
    // (e.g. doesn't retrigger render on TSS theme change)
    CustomElementManager.removeInstance(this);

    // remove @shared handlers
    removeSharedMemoryChangeHandlersOfInstance(this);

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
  setAttribute(name: string, value: any): void {
    CustomElementManager.setAttribute(this, name, value);
  }

  // @ts-ignore: Unused variables are valid here
  onPropChange(change: IPropChange) {}

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
    CustomElementManager.getAttribute(this, name);
  }

  // @ts-ignore: Unused variables are valid here
  shouldRender(reason: RenderReason, meta?: RenderReasonMetaData): boolean {
    return true;
  }

  // @ts-ignore: Unused variables are valid here
  onBeforeRender(tssOnly: boolean = false) {}

  render(): IVirtualNode {
    const msg = `🔥Custom element ${this.constructor.name} (<${this.nodeName} />) has no render() method nor a valid template (tpl)!`;

    // TODO: Function to render error
    st.warn(msg);

    return <pre>{msg}</pre>;
  }

  // @ts-ignore: Unused variables are valid here
  renderStyle(theme?: any): ITypedStyleSheet | undefined {
    return undefined;
  }

  doRenderStyle(): any {
    const options: ICustomElementOptions = Object.getPrototypeOf(this).constructor[CUSTOM_ELEMENT_OPTIONS];

    const declaration = st.tss.getDeclaration(this, options.tss, this.renderStyle);

    if (this._root! instanceof ShadowRoot) {
      return st.tss.renderStyleSheet(declaration);
    } else {
      return st.tss.renderStyleNode(declaration);
    }
  }

  doRender(tssOnly: boolean = false) {
    this.onBeforeRender(tssOnly);

    const options: ICustomElementOptions = Object.getPrototypeOf(this).constructor[CUSTOM_ELEMENT_OPTIONS];

    let vdom: IVirtualNode<any>;
    try {
      if (typeof options.tpl == "function") {
        vdom = options.tpl(this);
      } else {
        vdom = this.render();
      }
    } catch (e) {
      if (e.message.indexOf("tsx") > -1) {
        st.error(`💣 The function tsx of package vdom must be imported for wherever you use <tsx></tsx> syntax!`);
      }
      throw e;
    }

    const tss: IVirtualNode | CSSStyleSheet = this.doRenderStyle();

    let nodesToRender: Array<IVirtualNode>;
    if (tss instanceof CSSStyleSheet) {
      (this._root! as ShadowRoot).adoptedStyleSheets = [tss];
      nodesToRender = [vdom!];
    } else {
      nodesToRender = [tss, vdom!];
    }

    if (!this._notInitialRender) {
      // if there isn't a prev. VDOM state, render initially
      st.renderer.renderInitial(nodesToRender, (this._root as unknown) as IElement);

      this._notInitialRender = true;

      // call lifecycle method
      this.onAfterInitialRender();
    } else {
      // differential VDOM/DOM rendering algorithm
      st.renderer.patch((this._root as any).childNodes, nodesToRender, (this._root as unknown) as IElement);
    }

    // call lifecycle method
    this.onAfterRender(tssOnly);
  }

  onAfterInitialRender() {}

  // @ts-ignore: Unused variables are valid here
  onAfterRender(tssOnly: boolean = false) {}
}

// exception from the ./interface folder rule (to only export interfaces and types)
// from within interface folders, because here we need a typeof of an actual implementation
// and once we would import the impl. inside of an interface, it becomes a dependency (of the interface)
// thus we have to invert the dependencies direction
export type ICustomHTMLElement = typeof CustomHTMLElement;

if (!st.element) {
  st.element = CustomHTMLElement;
}
