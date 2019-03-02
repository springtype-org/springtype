import {ApplicationContext, Component} from "../../../di";
import {ApplicationEnvironment} from "../../../di/src/ApplicationContext";
import {WebComponentReflector} from "./WebComponentReflector";
import {IReactCreateElement} from "../ui/TSXRenderer";
import {CSSDeclarationBlockGenerator, CSSStyleSheetDeclaration} from "../../../css";
import {hmrEntrypoint} from "../../../hmr";

// @ts-ignore
hmrEntrypoint(module);

export const CHILD_ELEMENT = Symbol('CHILD_ELEMENT');
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
    shadow?: boolean;
    shadowAttachMode?: ShadowAttachMode;
    observeAttributes?: Array<string>;
    renderStrategy?: RenderStrategy;
    template?: (view: any) => IReactCreateElement | IReactCreateElement[];
    style?: (view: any) => CSSStyleSheetDeclaration;
}

export interface WebComponentLifecycle extends HTMLElement {

    init?(): void;

    mount?(): void;

    remount?(): void;

    // @ts-ignore
    render?(): JSX.Element;

    createNativeElement?(reactCreateElement: IReactCreateElement): any;

    unmount?(): void;

    onPropChanged?(name: string, newValue: any, oldValue?: any): void;

    onPropsChanged?(props: any, name: string | number | symbol, value: any): void;

    reflow?(): void;

    mountChildren?(): void;

    remountChildren?(): void;
}

export interface AttributeChangeEvent {
    name: string;
    oldValue: any;
    newValue: any;
}

export interface PropsChangeEvent {
    props: any;
    name: string | number | symbol;
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

    if (!(<any>window).React) {

        // default config for @WebApp is missing, load it!
        import("./WebApp");
    }

    if (!config.observeAttributes) config.observeAttributes = [];

    // default re-render strategy: when observeAttributes object changes
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
                if (config.renderStrategy === RenderStrategy.onPropsChanged) {
                    this.props = new Proxy({}, {
                        set: (props: any, name: string | number | symbol, value: any): boolean => {
                            if (props[name] !== value) {
                                props[name] = value;
                                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_PROPS_CHANGE, {
                                    detail: <PropsChangeEvent>{
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

                    this.observeAttributes = this.props || {};
                }

                if (config.shadow) {

                    this.attachShadow({
                        mode: config.shadowAttachMode ? config.shadowAttachMode : ShadowAttachMode.OPEN
                    });
                }

                !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_INIT));

                this.init();
            }

            static get observedAttributes() {

                const attributesToObserve = config.observeAttributes || [];

                // automatically allow for observeAttributes restore
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

            onPropsChanged(props: any, name: string | number | symbol, value: any): void {

                if (this.mounted) {

                    // re-render on observeAttributes change
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

            /**
             * Ensure that the destination array have no nested arrays
             */
            ensureVector = (destination: IReactCreateElement[], tsx: IReactCreateElement | IReactCreateElement[] | any) => {
                if (Array.isArray(tsx)) {
                    tsx.forEach(tsx => destination.push(tsx));
                } else {
                    destination.push(tsx)
                }
            };

            render(initial: boolean): IReactCreateElement[] {
                this.init();

                const elements: IReactCreateElement[] = [];

                // generate and inject styles
                if (config.style) {
                    this.ensureVector(
                        elements,
                        CSSDeclarationBlockGenerator.generate(config.style(this))
                    );
                }

                // TODO: Event fire
                console.log('re-render', this, this.props);

                if (super.render) {
                    this.ensureVector(elements, super.render());
                } else {
                    if (typeof config.template == 'function') {
                        // render template by default
                        this.ensureVector(elements, config.template(this));
                    }
                }
                return elements;
            }


            protected createNativeElement(reactCreateElement: IReactCreateElement): Element {
                if (super.createNativeElement) {
                    return super.createNativeElement(reactCreateElement);
                }
                return (<any>window).React.render(reactCreateElement);
            }

            protected flow = (initial: boolean = false) => {
                const _elements: IReactCreateElement[] = this.render(initial);
                if (_elements) {
                    const elements: Element[] = _elements
                        .filter(el => !!el)
                        .map((el) => this.createNativeElement(el));

                    if (elements.length > 0) {
                        if (config.shadow) {
                            elements.forEach(el => this.shadowRoot.appendChild(el));
                        } else {
                            elements.forEach(el => this.appendChild(el));
                        }
                        Reflect.set(this, CHILD_ELEMENT, elements);

                        if (initial) {
                            this.mountChildren();
                        } else {
                            this.remountChildren();
                        }
                    }
                }
            };

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

                const attributeValue = this.getAttributeLocalProp(name, newValue);

                console.log('attributeChangedCallback', attributeValue, name);

                // map local attribute field value

                if (name !== 'props' || !this[name]) {

                    // assign
                    this[name] = attributeValue;

                } else {

                    // merge
                    Object.assign(this[name], attributeValue);
                }

                console.log('setting wc attr', name, newValue);

                const cancelled = !this.dispatchEvent(new CustomEvent(LifecycleEvent.BEFORE_PROP_CHANGE, {
                    detail: <AttributeChangeEvent>{
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
            //TODO: Arron help meFix me :D
            const regCustomWebComponent = window.customElements.get(config.tag);
            if (!regCustomWebComponent) {
                // register custom element
                window.customElements.define(config.tag, CustomWebComponent);

                WebComponentReflector.setTagName(<any>CustomWebComponent, config.tag);
            }
        } catch (e) {

            if (ApplicationContext.getInstance().getEnvironment() === ApplicationEnvironment.DEV) {

                // hot reload based error for web component registration (window.customElements.define(...))
                if (e.message.indexOf(`this name  ${config.tag} has already been used with this registry`) > -1) {
                    window.location.href = '/';
                }
            }
            throw e;
        }
        return CustomWebComponent;
    }
}