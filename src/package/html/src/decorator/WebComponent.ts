import "../ui/JSXRenderer";
import {ApplicationContext, Component} from "../../../di";
import {ApplicationEnvironment} from "../../../di/src/ApplicationContext";
import {WebComponentReflector} from "./WebComponentReflector";
import {RenderStrategy} from "../ui/RenderStrategy";

const CHILD_ELEMENT = Symbol('CHILD_ELEMENT');
const STATE_OBJECT = Symbol('STATE_OBJECT');

export enum ShadowAttachMode {
    OPEN = 'open',
    CLOSED = 'closed'
}

export interface WebComponentConfig {
    tag: string;
    shadow?: boolean;
    shadowMode?: ShadowAttachMode;
    props?: Array<string>;
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
    onPropChange?(prop: string, newValue: any, oldValue?: any): void {};
    onStateChange?(prop: string, state: any): void {};
    reflow?(): void {};
}

export interface AttributeChangeEvent {
    prop: string;
    value: any
}

export enum LifecycleEvent {
    INIT = 'INIT',
    SHADOW_ATTACHED = 'SHADOW_ATTACHED',
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    ATTRIBUTE_CHANGE = 'ATTRIBUTE_CHANGE',
    STATE_CHANGE = 'STATE_CHANGE'
}

export interface IWebComponent<WC> extends Function {
    new(...args: any[]): WC;
}

class WebComponentState {
    constructor(private state: any) {}
}

// TODO: AOT: https://github.com/skatejs/skatejs/tree/master/packages/ssr
export function WebComponent<WC extends IWebComponent<any>>(config: WebComponentConfig): any {

    if (!config.props) config.props = [];

    if (!config.tag) {
        throw new Error("@WebComponent annotation must contain a tag name like: { tag: 'foo-bar-element', ... }");
    }

    return (target: WC) => {

        // @Component by default
        target = Component(target);

        // custom web component extends user implemented web component class
        // which extends HTMLElement
        let CustomWebComponent = class extends target {

            constructor(...args: Array<any>) {

                super();

                this.initialized = false;

                if (config.renderStrategy === RenderStrategy.OnStateChange) {

                    this.state = new Proxy(this.state || {}, {
                        set: (o, k, v): boolean => {

                            if (o[k] !== v) {

                                o[k] = v;

                                if (this.initialized) {
                                    this.reflow();
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

                this.dispatchEvent(new CustomEvent(LifecycleEvent.INIT));

                this.init();

                this.initialized = true;
            }

            static get observedAttributes() {
                return config.props;
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
            }

            onPropChange(prop: string, oldValue: string, newValue: string): void {

                if (super.onPropChange) {
                    return super.onPropChange(prop, oldValue, newValue);
                }
            }

            onStateChange(prop: string, state: any): void {

                if (super.onStateChange) {
                    return super.onStateChange(prop, state);
                }
            }

            mount() {

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

            attributeChangedCallback(prop: string, oldValue: string, newValue: string) {

                const attributeValue = this.getAttributeLocalState(prop, newValue);

                // map local attribute field value
                this[prop] = attributeValue;

                this.dispatchEvent(new CustomEvent(LifecycleEvent.ATTRIBUTE_CHANGE,  {
                    detail: <AttributeChangeEvent> {
                        prop,
                        value: attributeValue
                    }
                }));
            }

            connectedCallback() {

                this.dispatchEvent(new CustomEvent(LifecycleEvent.CONNECTED));

                this.mount();

                this.flow();
            }

            disconnectedCallback() {

                this.dispatchEvent(new CustomEvent(LifecycleEvent.DISCONNECTED));

                return this.unmount();
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