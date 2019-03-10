// import es5 adapter for backward-compatibility
import "../adapter/es5";

import {ApplicationContext, ApplicationEnvironment, Component, ComponentImpl} from "../../../di";
import {WebComponentReflector} from "../WebComponentReflector";
import {CSSDeclarationBlockGenerator, CSSInlineStyleGenerator} from "../../../tss";
import {createStateGetter} from "../../../state/src/function/createStateGetter";
import * as _ from "lodash";
import {APP_THEME} from "../../../tss/src/constant/APP_THEME";
import {VirtualElement} from "../../../renderer";
import {WebComponentImpl} from "./../interface/WebComponentImpl";
import {WebComponentConfig} from "./../interface/WebComponentConfig";
import {RenderStrategy} from "./../enum/RenderStrategy";
import {WebComponentLifecycleEvent} from "./../enum/WebComponentLifecycleEvent";
import {PropsChangeEvent} from "./../interface/PropsChangeEvent";
import {ShadowAttachMode} from "./../enum/ShadowAttachMode";
import {CHILD_ELEMENT} from "./../constant/CHILD_ELEMENT";
import {AttributeChangeEvent} from "./../interface/AttributeChangeEvent";
import {transformToElementVector} from "./../function/transformToElementVector";
import {ComponentReflector} from "../../../di";
import {createChangeDetector} from "../../../lang/src/decorator/detect-field-changes/function/createChangeDetector";
import {DEFAULT_CHANGE_DETECTION_FIELD_NAME} from "./../constant/DEFAULT_CHANGE_DETECTION_FIELD_NAME";
import {DEFAULT_STATE_FIELD_NAME} from "../../../state/src/constant/DEFAULT_STATE_FIELD_NAME";

export function WebComponent<WC extends WebComponentImpl<any>>(config: WebComponentConfig): any {

    if (!config.observeAttributes) config.observeAttributes = [];

    // default re-render strategy: when observeAttributes object changes
    if (!config.renderStrategy) config.renderStrategy = RenderStrategy.OnFieldChanges;

    if (!config.changeDetectionField) config.changeDetectionField = DEFAULT_CHANGE_DETECTION_FIELD_NAME;

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

                // call all registered initializer functions for this WebComponent as BeanFactory is not
                // creating instances of WebComponents but document.createElement. Thus, we need to do it here.
                ComponentReflector.callInitializers(ComponentReflector.getInitializers(CustomWebComponent), this);

                if (config.renderStrategy === RenderStrategy.OnFieldChanges) {

                    createChangeDetector(
                        this,
                        config.changeDetectionField!,
                        true,
                        (props: any, name: string | number | symbol, value: any) => {
                            this.onPropsChanged(props, name, value);
                        },
                        (props: any, name: string | number | symbol, value: any) => {
                            return this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_PROPS_CHANGE, {
                                detail: <PropsChangeEvent>{
                                    props,
                                    name,
                                    value
                                }
                            }))
                        }
                    );
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

                // TODO: Refactor to state module and isolate to be used for any @MapState
                // every component is stateful, but automatically re-rendering only happens
                // when there is a mapping from state to props and prop values actually differ
                if (config.mapStateToProps && typeof config.mapStateToProps === 'function') {

                    const mapStateToProps = (state: any) => {

                        const propsToChange: any = config.mapStateToProps!(state);

                        for (let propertyName in propsToChange) {

                            if (propsToChange.hasOwnProperty(propertyName)) {

                                if (!_.isEqual(propsToChange[propertyName], this.props[propertyName])) {
                                    this.props[propertyName] = propsToChange[propertyName];
                                }
                            }
                        }
                    };

                    const store = createStateGetter(this, DEFAULT_STATE_FIELD_NAME, (state: any) => {
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
                if (attributesToObserve.indexOf(config.changeDetectionField!) === -1) {
                    attributesToObserve.push(config.changeDetectionField!);
                }
                return attributesToObserve;
            }

            private getAttributeLocalProp(prop: string, propHeapPtr: string): any {

                const attributePropValue = (<any>window).React.attributeValueCache[propHeapPtr];
                delete (<any>window).React.attributeValueCache[propHeapPtr];
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

            // TODO: Make private / whatever with change-detector
            onPropsChanged(props: any, name: string | number | symbol, value: any): void {

                if (this.mounted) {

                    // re-render on observeAttributes change
                    this.reflow();
                }

                // TODO: Remove with change-detector
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

            render(): VirtualElement[] {

                const elements: VirtualElement[] = [];

                // generate and inject styles
                if (config.style) {

                    const contextTheme = ApplicationContext.getInstance().get(APP_THEME);

                    const theme = {
                        ...contextTheme ? contextTheme : {},
                        ...config.theme ? config.theme : {}
                    };

                    transformToElementVector(
                        elements,
                        CSSDeclarationBlockGenerator.generate(config.style(this, theme))
                    );

                    // support for :component selector (self-referenced component styles) works even in shadow DOM
                    const componentInlineStyle: any =
                        CSSInlineStyleGenerator.generateComponentStyles(config.style(this, theme));

                    for (let styleAttributeName in componentInlineStyle) {

                        if (componentInlineStyle.hasOwnProperty(styleAttributeName)) {
                            this.style[styleAttributeName] = componentInlineStyle[styleAttributeName];
                        }
                    }
                }

                if (super.render) {
                    transformToElementVector(elements, super.render());
                } else {

                    if (typeof config.template == 'function') {
                        // render template by default
                        transformToElementVector(elements, config.template(this));
                    }
                }
                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.RENDER));

                return elements;
            }

            protected createNativeElement(reactCreateElement: VirtualElement): Element {
                if (super.createNativeElement) {
                    return super.createNativeElement(reactCreateElement);
                }
                return (<any>window).React.render(reactCreateElement);
            }

            protected flow = (initial: boolean = false) => {

                const virtualElements: VirtualElement[] = this.render();

                if (virtualElements) {

                    const elements: Element[] = virtualElements
                        .filter(element => !!element)
                        .map((element) => this.createNativeElement(element));

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
                if (name !== config.changeDetectionField! || !this[name]) {

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