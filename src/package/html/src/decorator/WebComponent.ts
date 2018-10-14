import {ApplicationContext, Component} from "../../../di";
import {ApplicationEnvironment} from "../../../di/src/ApplicationContext";
import {WebComponentReflector} from "./WebComponentReflector";
import {StringCaseTransformator} from "../../../lang/src/StringCaseTransformator";

const CHILD_ELEMENT = Symbol('CHILD_ELEMENT');
const STATE_OBJECT = Symbol('STATE_OBJECT');

export enum ShadowAttachMode {
    OPEN = 'open',
    CLOSED = 'closed'
}

export enum RenderStrategy {
    OnRequest = 'ON_REQUEST',
    OnStateChange = 'ON_STATE_CHANGE' // TODO: OnPropChanged
}

export interface WebComponentConfig {
    tag: string;
    shadow?: boolean;
    shadowMode?: ShadowAttachMode;

    // TODO: -> props
    attributes?: Array<string>;
    renderStrategy?: RenderStrategy;
    template?: (view: any) => Node;
}

export class WebComponentLifecycle  {
    constructor() {};

    // TODO: state -> props
    state?: any = {};
    init?(): void {}
    mount?(): void {};
    remount?(): void {};
    render?(): JSX.Element {
        return ('');
    }
    unmount?(): void {};

    // TODO: onPropChanged
    onAttributeChange?(name: string, newValue: any, oldValue?: any): void {};

    // TODO: onPropsChanged
    onStateChange?(state: any, name: string|number|symbol, value: any): void {};
    reflow?(): void {};
    mountChildren?(): void {};
    remountChildren?(): void {};
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

    // TODO: BEFORE_PROP_CHANGE
    ATTRIBUTE_CHANGE = 'ATTRIBUTE_CHANGE',

    // TODO: remove
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

            protected mounted: boolean = false;

            constructor(...args: Array<any>) {

                super();

                // TODO: Register with route and GC ourselves on Route Change?!

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

                                if (!cancelled) { // todo: remove if
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

                const attributesToObserve = config.attributes || [];

                // automatically allow for state restore
                if (attributesToObserve.indexOf('state') === -1) {
                    attributesToObserve.push('state');
                }
                return attributesToObserve;
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

            onAttributeChange(name: string, oldValue: string, newValue: string): void {

                if (super.onAttributeChange) {
                    return super.onAttributeChange(name, oldValue, newValue);
                }
            }

            onStateChange(state: any, name: string|number|symbol, value: any): void {

                if (this.mounted) {

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
                this.mounted = true;
            }

            remount() {

                if (super.remount) {
                    return super.remount();
                }
            }

            mountChildren() {

                if (super.mountChildren) {
                    return super.mountChildren();
                }
            }

            remountChildren() {

                if (super.remountChildren) {
                    return super.remountChildren();
                }
            }


            unmount() {

                if (super.unmount) {
                    return super.unmount();
                }
            }

            render(initial: boolean): any {

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

            protected flow(initial: boolean = false) {

                const element: HTMLElement = this.render(initial);

                if (element) {

                    if (config.shadow) {
                        this.shadowRoot.appendChild(element);
                    } else {
                        this.appendChild(element);
                    }
                    Reflect.set(this, CHILD_ELEMENT, element);

                    if (initial) {
                        this.mountChildren();
                    } else {
                        this.remountChildren();
                    }
                }
            }

            protected reflow() {

                if (config.shadow) {
                    this.shadowRoot.innerHTML = '';
                } else {
                    this.innerHTML = '';
                }

                this.flow();

                this.remount();
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {

                const attributeValue = this.getAttributeLocalState(name, newValue);

                // map local attribute field value

                if (name !== 'state' || !this[name]) {

                    // assign
                    this[StringCaseTransformator.kebabToCamelCase(name)] = attributeValue;

                } else {

                    // merge
                    Object.assign(this[name], attributeValue);
                }
                console.log('setting wc attr', name, newValue);

                // TODO: BEFORE_PROP_CHANGE
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

                    this.mount();

                    this.flow(true);

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