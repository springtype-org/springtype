import {ApplicationContext, Component} from "../../../di";
import {ApplicationEnvironment} from "../../../di/src/ApplicationContext";
import {WebComponentReflector} from "./WebComponentReflector";
import {IReactCreateElement} from "../ui/TSXRenderer";
import {CSSDeclarationBlockGenerator, CSSStyleSheetDeclaration} from "../../../tss";
import {hmrEntrypoint} from "../../../hmr";
import {CSSInlineStyleGenerator} from "../../../tss/src/CSSInlineStyleGenerator";
import {connectComponent} from "../../../state/src/connectComponent";
import {PropertyComparator} from "../../../lang/src/util/PropertyComparator";
import {IComponent} from "../../../di/src/decorator/Component";

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
    OnPropsChanged = 'ON_PROPS_CHANGED'
}

export interface WebComponentConfig {
    tag: string;
    shadow?: boolean;
    mapStateToProps?: (state: any) => Object;
    shadowAttachMode?: ShadowAttachMode;
    observeAttributes?: Array<string>;
    renderStrategy?: RenderStrategy;
    template?: (view: any) => IReactCreateElement | IReactCreateElement[];
    style?: (view: any, theme?: Object) => CSSStyleSheetDeclaration;
    theme?: Object;
    components?: Array<IComponent<any>>;
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

export enum WebComponentLifecycleEvent {
    BEFORE_INIT = 'BEFORE_INIT',
    INIT = 'INIT',
    SHADOW_ATTACHED = 'SHADOW_ATTACHED',
    BEFORE_MOUNT = 'BEFORE_MOUNT',
    MOUNT = 'MOUNT',
    REMOUNT = 'REMOUNT',
    BEFORE_UNMOUNT = 'BEFORE_UNMOUNT',
    UNMOUNT = 'UNMOUNT',
    MOUNT_CHILDREN = 'MOUNT_CHILDREN',
    REMOUNT_CHILDREN = 'REMOUNT_CHILDREN',
    BEFORE_PROP_CHANGE = 'BEFORE_PROP_CHANGE',
    BEFORE_PROPS_CHANGE = 'BEFORE_PROPS_CHANGE',
    FLOW = 'FLOW',
    REFLOW = 'REFLOW',
    RENDER = 'RENDER',
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
    if (!config.renderStrategy) config.renderStrategy = RenderStrategy.OnPropsChanged;

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

                if (config.renderStrategy === RenderStrategy.OnPropsChanged) {
                    this.props = new Proxy({}, {
                        set: (props: any, name: string | number | symbol, value: any): boolean => {

                            if (props[name] !== value) {
                                props[name] = value;
                                const cancelled = !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_PROPS_CHANGE, {
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
                }

                if (config.renderStrategy === RenderStrategy.OnRequest) {
                    this.observeAttributes = this.props || {};
                }

                if (config.shadow) {

                    this.attachShadow({
                        mode: config.shadowAttachMode ? config.shadowAttachMode : ShadowAttachMode.OPEN
                    });
                }

                !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_INIT));

                // every component is stateful, but automatically re-rendering only happens
                // when there is a mapping from state to props and prop values actually differ
                if (config.mapStateToProps && typeof config.mapStateToProps === 'function') {

                    const mapStateToProps = (state: any) => {

                        const propsToChange: any = config.mapStateToProps!(state);

                        for (let propertyName in propsToChange) {

                            if (propsToChange.hasOwnProperty(propertyName)) {

                                if (!PropertyComparator.equal(propsToChange[propertyName], this.props[propertyName])) {
                                    this.props[propertyName] = propsToChange[propertyName];
                                }
                            }
                        }
                    };

                    const store = connectComponent(this, (state: any) => {
                        mapStateToProps(state);
                    });

                    // init state
                    mapStateToProps(store.getState());
                }
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

                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.INIT));
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

                if (super.mount) {
                    super.mount();
                }
                this.mounted = true;

                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.MOUNT));
            }

            remount() {

                if (super.remount) {
                    super.remount();
                }

                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.REMOUNT));
            }

            mountChildren() {

                if (super.mountChildren) {
                    super.mountChildren();
                }
                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.MOUNT_CHILDREN));
            }

            remountChildren() {

                if (super.remountChildren) {
                    super.remountChildren();
                }
                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.REMOUNT_CHILDREN));
            }


            unmount() {

                if (super.unmount) {
                    super.unmount();
                }
                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.UNMOUNT));
            }

            /**
             * Ensure that the destination array have no nested arrays
             */
            ensureVector = (destination: IReactCreateElement[], tsx: IReactCreateElement | IReactCreateElement[] | any) => {

                if (tsx.name && tsx.name === 'st-fragment') {
                    tsx = tsx.children;
                }

                if (Array.isArray(tsx)) {
                    tsx.forEach(tsx => destination.push(tsx));
                } else {



                    destination.push(tsx)
                }
            };

            render(): IReactCreateElement[] {
                this.init();

                const elements: IReactCreateElement[] = [];

                // generate and inject styles
                if (config.style) {
                    this.ensureVector(
                        elements,
                        CSSDeclarationBlockGenerator.generate(config.style(this, config.theme))
                    );

                    // support for :component selector (self-referenced component styles) works even in shadow DOM
                    const componentInlineStyle = CSSInlineStyleGenerator.generateComponentStyles(config.style(this, config.theme));

                    for (let styleAttributeName in componentInlineStyle) {

                        if (componentInlineStyle.hasOwnProperty(styleAttributeName)) {
                            this.style[styleAttributeName] = componentInlineStyle[styleAttributeName];
                        }
                    }
                }

                if (super.render) {
                    this.ensureVector(elements, super.render());
                } else {
                    if (typeof config.template == 'function') {
                        // render template by default
                        this.ensureVector(elements, config.template(this));
                    }
                }
                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.RENDER));

                return elements;
            }

            protected createNativeElement(reactCreateElement: IReactCreateElement): Element {
                if (super.createNativeElement) {
                    return super.createNativeElement(reactCreateElement);
                }
                return (<any>window).React.render(reactCreateElement);
            }

            protected flow = (initial: boolean = false) => {
                const _elements: IReactCreateElement[] = this.render();
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

                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.FLOW));
            };

            protected reflow() {

                if (config.shadow) {
                    this.shadowRoot.innerHTML = '';
                } else {
                    this.innerHTML = '';
                }

                this.flow();

                this.remount();

                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.REFLOW));
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {

                const attributeValue = this.getAttributeLocalProp(name, newValue);

                // map local attribute field value
                if (name !== 'props' || !this[name]) {

                    // assign
                    this[name] = attributeValue;

                } else {

                    // merge
                    Object.assign(this[name], attributeValue);
                }

                const cancelled = !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_PROP_CHANGE, {
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

                const cancelled = !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_MOUNT));

                if (!cancelled) {

                    this.mount();

                    this.flow(true);

                }
            }

            disconnectedCallback() {
                const cancelled = !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_UNMOUNT));

                if (!cancelled) {
                    return this.unmount();
                }
            }
        };

        try {

            const regCustomWebComponent = window.customElements.get(config.tag);

            // must contain a kebab-dash
            if (config.tag.indexOf('-') === -1) {
                throw new Error("WebComponent's tag name must be prefixed like: app-your-element-name. But this tag looks like: " + config.tag);
            }

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