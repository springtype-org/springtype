import { st } from "../../core";
import { removeSharedMemoryChangeHandlersOfInstance } from "../../core/sharedmemory/share";
import { GlobalCache } from "../../core/st/interface/i$st";
import { IOnStateChange, IStateChange, StateChangeType } from "../../core/state/interface";
import { DEFAULT_EMPTY_PATH, StateChangeManager } from "../../core/state/state-change-manager";
import { ADOPT_STYLESHEETS } from "../tss";
import { ITypedStyleSheet } from "../tss/interface";
import { tsx } from "../vdom";
import { IElement, IVirtualNode } from "../vdom/interface";
import { ICustomElementOptions } from "./interface";
import { ATTRS, CUSTOM_ELEMENT_OPTIONS, ICustomHTMLElementInternals, INTERNAL, TAG_NAME } from "./interface/icustom-html-element";
import { ILifecycle, RenderReason, RenderReasonMetaData } from "./interface/ilifecycle";

const initAttrs = (instance: any) => {
  // add change detection / reflection for all @attrs
  for (let attributeName of instance[ATTRS] || []) {
    Object.defineProperty(instance, attributeName, {
      get: () => {
        return instance.getAttribute(attributeName);
      },
      set: (value: any) => {
        instance.setAttribute(attributeName, value);
      },
    });
  }
  delete instance[ATTRS]; // cleanup temp. registry
};

export class CustomHTMLElement extends HTMLElement implements ILifecycle, IOnStateChange {
  // shadow functionallity that shouldn't break userland impl.
  [INTERNAL]: ICustomHTMLElementInternals;

  // attributes registered to be reference change-detected
  [ATTRS]: Array<string>;

  constructor() {
    super();

    // internal state initialization
    this[INTERNAL] = {
      root: this,
      notInitialRender: false,
      attributes: {},
      options: Object.getPrototypeOf(this).constructor[CUSTOM_ELEMENT_OPTIONS],
      adoptedStylesheets: Object.getPrototypeOf(this).constructor[ADOPT_STYLESHEETS],
    } as ICustomHTMLElementInternals;

    // TODO:
    // State.enableFor(this)
    // Attr.enableFor(this)
    // ShadowDOM.enableFor(this, shadowMode)

    initAttrs(this);

    // init @state support
    StateTrait.initStates(this, Object.getPrototypeOf(this).constructor[STATE] || []);

    // in case of "open" or "closed" shadow DOM, use shadow DOM root node
    if (this[INTERNAL].options.shadowMode != "none" && !this.shadowRoot) {
      this[INTERNAL].root = this.attachShadow({
        mode: this[INTERNAL].options.shadowMode as ShadowRootMode,
      });
    }

    // register with global instance registry
    st[GlobalCache.CUSTOM_ELEMENT_INSTANCES].push(this);
  }

  onBeforeConnect() {}

  // internal web component standard method
  connectedCallback() {
    this.onConnect();

    if (this.shouldRender(RenderReason.INITIAL)) {
      this.doRender();
    }
  }

  onConnect() {}

  disconnectedCallback() {
    // evict from global instance registry
    // (e.g. doesn't retrigger render on TSS theme change)
    let index = st[GlobalCache.CUSTOM_ELEMENT_INSTANCES].indexOf(this);
    if (index > -1) {
      st[GlobalCache.CUSTOM_ELEMENT_INSTANCES].splice(index, 1);
    }

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
    const prevValue = this[INTERNAL].attributes[name];

    if (prevValue !== value && this.shouldAttributeChange(name, value, prevValue)) {
      this[INTERNAL].attributes[name] = value;

      if (
        // don't reflow if it's the first render cycle (because attribute rendering is covered with first full render cycle)
        this[INTERNAL].notInitialRender &&
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
    return this[INTERNAL].attributes[name];
  }

  // @ts-ignore: Unused variables are valid here
  shouldRender(reason: RenderReason, meta?: RenderReasonMetaData): boolean {
    return true;
  }

  // @ts-ignore: Unused variables are valid here
  onBeforeRender(tssOnly: boolean = false) {}

  render(): IVirtualNode {
    if (typeof this[INTERNAL].options.tpl! != "function") {
      const msg = `Custom element ${this.constructor.name} (<${this.nodeName} />) has no render() method nor a valid template (tpl)!`;

      // TODO: Function to render error
      st.warn(msg);

      return <pre>{msg}</pre>;
    }
    return this[INTERNAL].options.tpl!(this);
  }

  // @ts-ignore: Unused variables are valid here
  renderStyle(theme?: any): ITypedStyleSheet | undefined {
    return undefined;
  }

  async doRenderStyle(): Promise<any> {
    let declaration = st.tss.getDeclaration(this, this[INTERNAL].options.tss, this.renderStyle);

    if (this[INTERNAL].root! instanceof ShadowRoot) {
      let styleSheets: Array<CSSStyleSheet> = [];

      if (this[INTERNAL].adoptedStylesheets) {
        // fetch CSSStyleSheet instances
        const shadowStyleSheets = await st.tss.getShadowStyleSheets(this[INTERNAL].adoptedStylesheets);

        styleSheets = [...shadowStyleSheets];
      }
      styleSheets.push(st.tss.renderStyleSheet(declaration));

      return styleSheets;
    } else {
      if (this[INTERNAL].adoptedStylesheets) {
        // adding <link ref="stylesheet"> to <head> and caching by name
        st.tss.addHeadStyleSheets(this[INTERNAL].adoptedStylesheets);
      }
      return st.tss.renderStyleNode(declaration);
    }
  }

  async doRender(tssOnly: boolean = false) {
    this.onBeforeRender(tssOnly);

    let vdom: IVirtualNode<any>;
    try {
      vdom = this.render();
    } catch (e) {
      if (e.message.indexOf("tsx") > -1) {
        st.error(`The function tsx of package vdom must be imported for wherever you use <tsx></tsx> syntax!`);
      }
      throw e;
    }

    const tss: IVirtualNode | Array<CSSStyleSheet> = await this.doRenderStyle();

    let nodesToRender: Array<IVirtualNode>;
    if ((tss && (tss as Array<CSSStyleSheet>)[0] instanceof CSSStyleSheet) || !tss) {
      (this[INTERNAL].root as ShadowRoot).adoptedStyleSheets = tss as Array<CSSStyleSheet>;
      nodesToRender = [vdom!];
    } else {
      nodesToRender = [tss as IVirtualNode, vdom!];
    }

    if (!this[INTERNAL].notInitialRender) {
      // if there isn't a prev. VDOM state, render initially
      st.renderer.renderInitial(nodesToRender, (this[INTERNAL].root as unknown) as IElement);

      this[INTERNAL].notInitialRender = true;

      // call lifecycle method
      this.onAfterInitialRender();
    } else {
      // differential VDOM/DOM rendering algorithm
      st.renderer.patch((this[INTERNAL].root as any).childNodes, nodesToRender, (this[INTERNAL].root as unknown) as IElement);
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

export const defineCustomElement = (tagName: string, targetClass: any, options: ICustomElementOptions = {}) => {
  // default to none for max. backward compatibility
  if (!options.shadowMode) {
    options.shadowMode = "open";
  }

  if (!tagName) {
    st.error(`The custom element ${targetClass.name} has no tag name! It should look like: @customElement('my-element', ...) or functional: st.customElement('my-element', ...)`);
  }

  // must contain a kebab-dash for namespacing
  if (tagName.indexOf("-") === -1) {
    st.error(`The custom element ${targetClass.name}'s tag name: ${tagName} has no namespace! All custom elements must be namespaced, like: my-element (whereas 'my' is the namespace).`);
  }

  // register with DOM API
  customElements.define(tagName, targetClass);

  // assign options to be used in CustomElement derived class constructor
  targetClass[TAG_NAME] = tagName;
  targetClass[CUSTOM_ELEMENT_OPTIONS] = options;

  // return enhanced class
  return targetClass;
};

// FIXME: Trait: StateTrait raus hier

export const STATE: any = Symbol("STATE");

interface IState {
  name: string;
  type: StateChangeType;
}

export class StateTrait {
  static addState(ctor: any, name: string | symbol, type: StateChangeType) {
    if (!ctor[STATE]) {
      ctor[STATE] = [];
    }
    ctor[STATE].push({
      name,
      type,
    });
  }

  static initStates(instance: any, states: Array<IState>) {
    for (let i = 0; i < states.length; i++) {
      StateTrait.initState(instance, states[i].name, states[i].type);
    }
  }

  static handleCustomElementStateChange(instance: any, change: IStateChange) {
    if (process.env.NODE_ENV != "production" && st.debug) {
      st.info("state-change-manager.ts", "@state()", change.name, "change detected on", instance, change);
    }

    // call handler method if implemented
    if (typeof instance.onStateChange == "function") {
      instance.onStateChange(change);
    }

    // if the instance never rendered yet, don't call doRender()!
    if (!(instance[INTERNAL] as ICustomHTMLElementInternals).notInitialRender) return;

    if (
      instance.shouldRender(RenderReason.PROP_CHANGE, {
        name: change.name,
        path: change.path,
        value: change.value,
        prevValue: change.prevValue,
        type: change.type,
      })
    ) {
      instance.doRender();
    }
  }

  static initState(instance: ICustomHTMLElement, name: string, type: StateChangeType) {
    StateChangeManager.onStateChange(
      instance,
      name,
      type,
      (value: any, prevValue: any) => {
        StateTrait.handleCustomElementStateChange(instance, {
          type: StateChangeType.REFERENCE,
          path: DEFAULT_EMPTY_PATH,
          name,
          value,
          prevValue,
        });
      },
      (path: string, value: any, prevValue: any) => {
        StateTrait.handleCustomElementStateChange(instance, {
          type: StateChangeType.DEEP,
          path,
          name,
          value,
          prevValue,
        });
      },
    );
  }
}

// initialize global instance cache
if (!st[GlobalCache.CUSTOM_ELEMENT_INSTANCES]) {
  st[GlobalCache.CUSTOM_ELEMENT_INSTANCES] = [];
}
