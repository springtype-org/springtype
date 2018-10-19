import {ApplicationContext, Component} from "../../../di";
import {ApplicationEnvironment} from "../../../di/src/ApplicationContext";
import {WebComponentReflector} from "./WebComponentReflector";
import {CaseTransformer} from "../../../lang";

const CHILD_ELEMENT = Symbol('CHILD_ELEMENT');
const PROPS_OBJECT = Symbol('PROPS_OBJECT');

export enum ShadowAttachMode {
    OPEN = 'open',
    CLOSED = 'closed'
}

export enum RenderStrategy {
    OnRequest = 'ON_REQUEST',
    onPropsChanged = 'ON_PROPS_CHANGED'
}

export interface WebComponentConfig {
    tag: string;
    isolate?: boolean;
    isolateMode?: ShadowAttachMode;
    props?: Array<string>;
    renderStrategy?: RenderStrategy;
    template?: (view: any) => Node;
}

export class WebComponentLifecycle  {
    constructor() {};

    props?: any = {};
    init?(): void {}
    mount?(): void {};
    remount?(): void {};
    render?(): JSX.Element {
        return ('');
    }
    unmount?(): void {};
    onPropChanged?(name: string, newValue: any, oldValue?: any): void {};
    onPropsChanged?(props: any, name: string|number|symbol, value: any): void {};
    reflow?(): void {};
    mountChildren?(): void {};
    remountChildren?(): void {};
}

export interface AttributeChangeEvent {
    name: string;
    oldValue: any;
    newValue: any;
}

export interface PropsChangeEvent {
    props: any;
    name: string|number|symbol;
    value: any;
}

export enum LifecycleEvent {
    BEFORE_INIT = 'BEFORE_INIT',
    SHADOW_ATTACHED = 'SHADOW_ATTACHED',
    BEFORE_MOUNT = 'BEFORE_MOUNT',
    BEFORE_UNMOUNT = 'BEFORE_UNMOUNT',
    BEFORE_PROP_CHANGE = 'BEFORE_PROP_CHANGE',
    BEFORE_PROPS_CHANGE = 'BEFORE_PROPS_CHANGE'
}

export interface IWebComponent<WC> extends Function {
    new(...args: any[]): WC;
}

// TODO: AOT: https://github.com/skatejs/skatejs/tree/master/packages/ssr
export function WebComponent<WC extends IWebComponent<any>>(config: WebComponentConfig): any {

    if (!config.props) config.props = [];

    // default re-render strategy: when props object changes
    if (!config.renderStrategy) config.renderStrategy = RenderStrategy.onPropsChanged;

    if (!config.tag) {
        throw new Error("@WebComponent annotation must contain a tag name like: { tag: 'foo-bar-element', ... }");
    }

    return (webComponent: WC) => {

        // @Component by default
        const injectableWebComponent = Component(webComponent);

        // custom web component extends user implemented web component class
        // which extends HTMLElement
        let CustomWebComponent = class extends injectableWebComponent {

            protected mounted: boolean = false;

            constructor(...args: Array<any>) {

                super();

                // TODO: Register with route and GC ourselves on Route Change?! -> timer out of control

                if (config.renderStrategy === RenderStrategy.onPropsChanged) {

                    this.props = new Proxy(this.props || {}, {
                        set: (props: any, name: string|number|symbol, value: any): boolean => {

                            console.log('props change');

                            if (props[name] !== value) {

                                props[name] = value;

                                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_PROPS_CHANGE,  {
                                    detail: <PropsChangeEvent> {
                                        props,
                                        name,
                                        value
                                    }
                                }));

                                if (!cancelled) {
                                    this.onPropsChanged(props, name, value);
                                }
                            }
                            return true;
                        }
                    });

                    Object.defineProperty(this, 'props', {
                        writable: false
                    });


                } else {

                    this.props = this.props || {};
                }

                if (config.isolate) {

                    this.attachShadow({
                        mode: config.isolateMode ? config.isolateMode : ShadowAttachMode.OPEN
                    });
                }

                !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_INIT));

                this.init();
            }

            static get observedAttributes() {

                const attributesToObserve = config.props || [];

                // automatically allow for props restore
                if (attributesToObserve.indexOf('props') === -1) {
                    attributesToObserve.push('props');
                }
                return attributesToObserve;
            }

            private getAttributeLocalProp(prop: string, propHeapPtr: string): any {

                const attributePropValue = (<any>window).React.propsHeapCache[propHeapPtr];

                delete (<any>window).React.propsHeapCache[propHeapPtr];

                return attributePropValue;
            }

            init(): void {

                if (super.init) {
                    super.init();
                }
            }

            onPropChanged(name: string, oldValue: string, newValue: string): void {

                if (super.onPropChanged) {
                    return super.onPropChanged(name, oldValue, newValue);
                }
            }

            onPropsChanged(props: any, name: string|number|symbol, value: any): void {

                if (this.mounted) {

                    // re-render on props change
                    this.reflow();
                }

                if (super.onPropsChanged) {
                    return super.onPropsChanged(props, name, value);
                }
            }

            mount() {

                console.log('on mount', this);

                if (super.mount) {
                    super.mount();
                }
                this.mounted = true;
            }

            remount() {

                if (super.remount) {
                    super.remount();
                }
            }

            mountChildren() {

                if (super.mountChildren) {
                    super.mountChildren();
                }
            }

            remountChildren() {

                if (super.remountChildren) {
                    super.remountChildren();
                }
            }


            unmount() {

                if (super.unmount) {
                    super.unmount();
                }
            }

            render(initial: boolean): any {

                // TODO: Event fire
                console.log('re-render', this, this.props);

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

                    if (config.isolate) {
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

                if (config.isolate) {
                    this.shadowRoot.innerHTML = '';
                } else {
                    this.innerHTML = '';
                }

                this.flow();

                this.remount();
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {

                const attributeValue = this.getAttributeLocalProp(name, newValue);

                // map local attribute field value

                if (name !== 'props' || !this[name]) {

                    // assign
                    this[CaseTransformer.kebabToCamelCase(name)] = attributeValue;

                } else {

                    // merge
                    Object.assign(this[name], attributeValue);
                }

                console.log('setting wc attr', name, newValue);

                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_PROP_CHANGE,  {
                    detail: <AttributeChangeEvent> {
                        name: name,
                        oldValue,
                        newValue
                    }
                }));

                if (!cancelled) {
                    this.onPropChanged(name, oldValue, newValue);
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