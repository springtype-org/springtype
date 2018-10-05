import "../ui/JSXRenderer";
import {ApplicationContext, Component} from "../../../di";
import {ApplicationEnvironment} from "../../../di/src/ApplicationContext";
import {WebComponentReflector} from "./WebComponentReflector";

export enum ShadowAttachMode {
    OPEN = 'open',
    CLOSED = 'closed'
}

export interface WebComponentConfig {
    tag: string;
    shadow?: boolean;
    shadowMode?: ShadowAttachMode;
    props?: Array<string>;
}

export class WebComponentLifecycle  {
    state?: any = {};
    init?(): void {}
    mount?(): void {}
    render?(): JSX.Element {
        return ('');
    }
    unmount?(): void {}
    onPropChange?(prop: string, newValue: any, oldValue?: any): void {};
    onStateChange?(prop: string, state: any): void {}
}

export interface PropertyChangeEvent {
    prop: string;
    newValue: any;
    oldValue: any;
}

export enum LifecycleEvent {
    INIT = 'INIT',
    SHADOW_ATTACHED = 'SHADOW_ATTACHED',
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
    PROPERTY_CHANGE = 'PROPERTY_CHANGE',
    STATE_CHANGE = 'STATE_CHANGE'
}

export interface IWebComponent<WC> extends Function {
    new(...args: any[]): WC;
}

// TODO: AOT: https://github.com/skatejs/skatejs/tree/master/packages/ssr
export function WebComponent<WC extends IWebComponent<any>>(config: WebComponentConfig): any {

    if (!config.props) config.props = [];

    if (!config.tag) {
        throw new Error("@WebComponent annotation must contain a tag name like: { tag: 'foo-bar-element', ... }");
    }

    return (target: WC) => {

        let CustomWebComponent = class extends target {

            constructor(...args: Array<any>) {

                super();

                // initialize state
                this.state = {};

                if (config.shadow) {

                    this.attachShadow({
                        mode: config.shadowMode ? config.shadowMode : ShadowAttachMode.OPEN
                    });
                }

                this.dispatchEvent(new CustomEvent(LifecycleEvent.INIT));

                this.init();
            }

            static get observedAttributes() {
                return config.props;
            }

            attributeChangedCallback(prop: string, oldValue: string, newValue: string) {

                this.dispatchEvent(new CustomEvent(LifecycleEvent.PROPERTY_CHANGE,  {
                    detail: <PropertyChangeEvent> {
                        prop,
                        oldValue,
                        newValue
                    }
                }));

                this.onPropChange(prop, newValue, oldValue);

                if (newValue.startsWith('state')) {
                    this.changeState(prop, newValue);
                }
            }

            changeState(prop: string, stateHeapPtr: string): void {

                const propState = (<any>window).React.stateHeapCache[stateHeapPtr];

                delete (<any>window).React.stateHeapCache[stateHeapPtr];

                if (this.state) {
                    this.state[prop] = propState;
                    this.onStateChange(prop, propState);
                }
            }

            connectedCallback() {

                this.dispatchEvent(new CustomEvent(LifecycleEvent.CONNECTED));

                this.mount();

                const element: HTMLElement = <any> this.render();

                if (element) {

                    if (config.shadow) {
                        this.shadowRoot.appendChild(element);
                    } else {
                        this.appendChild(element);
                    }
                }
            }

            disconnectedCallback() {

                this.dispatchEvent(new CustomEvent(LifecycleEvent.DISCONNECTED));

                return this.unmount();
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

            render(): JSX.Element {

                if (super.render) {
                    return super.render();
                } else {
                    return ('');
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