import "../ui/JSXRenderer";
import {ApplicationContext, Component} from "../../../di";
import {ApplicationEnvironment} from "../../../di/src/ApplicationContext";
import {WebComponentReflector} from "./WebComponentReflector";

const CHILD_ELEMENT = Symbol('CHILD_ELEMENT');
const STATE_OBJECT = Symbol('STATE_OBJECT');

export enum ShadowAttachMode {
    OPEN = 'open',
    CLOSED = 'closed'
}

export enum RenderStrategy {
    OnRequest = 'ON_REQUEST',
    OnStateChange = 'ON_STATE_CHANGE'
}

export interface WebComponentConfig {
    tag: string;
    shadow?: boolean;
    shadowMode?: ShadowAttachMode;
    attributes?: Array<string>;
    renderStrategy?: RenderStrategy;
    template?: (view: any) => Node;
}


export class WebComponentLifecycle  {
    constructor() {}
    state?: any = {};
    init?(): void {}
    mount?(): void {}
    render?(): JSX.Element {
        return ('');
    }
    unmount?(): void {}
    onAttributeChange?(name: string, newValue: any, oldValue?: any): void {};
    onStateChange?(state: any, name: string|number|symbol, value: any): void {};
    reflow?(): void {};
}

export interface AttributeChangeEvent {
    name: string;
    oldValue: any;
    newValue: any;
}

export interface StateChangeEvent {
    state: any;
    name: string|number|symbol;
    value: any;
}


export enum LifecycleEvent {
    BEFORE_INIT = 'BEFORE_INIT',
    SHADOW_ATTACHED = 'SHADOW_ATTACHED',
    BEFORE_MOUNT = 'BEFORE_MOUNT',
    BEFORE_UNMOUNT = 'BEFORE_UNMOUNT',
    ATTRIBUTE_CHANGE = 'ATTRIBUTE_CHANGE',
    BEFORE_STATE_CHANGE = 'BEFORE_STATE_CHANGE'
}

export interface IWebComponent<WC> extends Function {
    new(...args: any[]): WC;
}

// TODO: AOT: https://github.com/skatejs/skatejs/tree/master/packages/ssr
export function WebComponent<WC extends IWebComponent<any>>(config: WebComponentConfig): any {

    if (!config.attributes) config.attributes = [];

    if (!config.tag) {
        throw new Error("@WebComponent annotation must contain a tag name like: { tag: 'foo-bar-element', ... }");
    }

    return (target: WC) => {

        // @Component by default
        target = Component(target);

        // custom web component extends user implemented web component class
        // which extends HTMLElement
        let CustomWebComponent = class extends target {

            protected initialized: boolean = false;

            constructor(...args: Array<any>) {

                super();

                if (config.renderStrategy === RenderStrategy.OnStateChange) {

                    this.state = new Proxy(this.state || {}, {
                        set: (state: any, name: string|number|symbol, value: any): boolean => {

                            console.log('state change');

                            if (state[name] !== value) {

                                state[name] = value;

                                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_STATE_CHANGE,  {
                                    detail: <StateChangeEvent> {
                                        state,
                                        name,
                                        value
                                    }
                                }));

                                if (!cancelled) {
                                    this.onStateChange(state, name, value);
                                }
                            }
                            return true;
                        }
                    });

                    Object.defineProperty(this, 'state', {
                        writable: false
                    });


                } else {

                    this.state = this.state || {};
                }

                if (config.shadow) {

                    this.attachShadow({
                        mode: config.shadowMode ? config.shadowMode : ShadowAttachMode.OPEN
                    });
                }

                !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_INIT));

                this.init();
            }

            static get observedAttributes() {
                return config.attributes;
            }

            private getAttributeLocalState(prop: string, stateHeapPtr: string): any {

                const attributeStateValue = (<any>window).React.stateHeapCache[stateHeapPtr];

                delete (<any>window).React.stateHeapCache[stateHeapPtr];

                return attributeStateValue;
            }

            init(): void {

                if (super.init) {
                    super.init();
                }
                this.initialized = true;
            }

            onAttributeChange(name: string, oldValue: string, newValue: string): void {

                if (super.onAttributeChange) {
                    return super.onAttributeChange(name, oldValue, newValue);
                }
            }

            onStateChange(state: any, name: string|number|symbol, value: any): void {

                if (this.initialized) {

                    // re-render on state change
                    this.reflow();
                }

                if (super.onStateChange) {
                    return super.onStateChange(state, name, value);
                }
            }

            mount() {

                console.log('on mount', this);

                if (super.mount) {
                    return super.mount();
                }
            }

            unmount() {

                if (super.unmount) {
                    return super.unmount();
                }
            }

            render(): any {

                // TODO: Event fire
                console.log('re-render', this, this.state);

                if (super.render) {
                    return super.render();
                } else {

                    if (typeof config.template == 'function') {

                        // render template by default
                        return config.template(this);
                    }
                    return ('');
                }
            }

            protected flow() {

                const element: HTMLElement = this.render();

                if (element) {

                    if (config.shadow) {
                        this.shadowRoot.appendChild(element);
                    } else {
                        this.appendChild(element);
                    }
                    Reflect.set(this, CHILD_ELEMENT, element);
                }
            }

            protected reflow() {

                if (config.shadow) {
                    this.shadowRoot.innerHTML = '';
                } else {
                    this.innerHTML = '';
                }

                this.flow();
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {

                const attributeValue = this.getAttributeLocalState(name, newValue);

                // map local attribute field value
                this[name] = attributeValue;

                console.log('setting wc attr', name, newValue);

                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.ATTRIBUTE_CHANGE,  {
                    detail: <AttributeChangeEvent> {
                        name: name,
                        oldValue,
                        newValue
                    }
                }));

                if (!cancelled) {
                    this.onAttributeChange(name, oldValue, newValue);
                }
            }

            connectedCallback() {

                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_MOUNT));

                if (!cancelled) {

                    // TODO: Call mount after attributes have been set!
                    this.mount();

                    this.flow();

                } else {

                    console.warn('');
                }
            }

            disconnectedCallback() {

                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_UNMOUNT));

                if (!cancelled) {

                    return this.unmount();
                }
            }
        };

        try {

            // register custom element
            window.customElements.define(config.tag, CustomWebComponent);

            WebComponentReflector.setTagName(<any>CustomWebComponent, config.tag);

        } catch(e) {

            if (ApplicationContext.getInstance().getEnvironment() === ApplicationEnvironment.DEV) {

                // hot reload based error for web component registration (window.customElements.define(...))
                if (e.message.indexOf('this name has already been used with this registry') > -1) {
                    window.location.href = '/';
                }
            }
            throw e;
        }
        return CustomWebComponent;
    }
}