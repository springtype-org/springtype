import {WebComponentConfig} from "../interface/WebComponentConfig";
import {CHILD_ELEMENTS} from "../constant/CHILD_ELEMENTS";
import {transformToElementVector} from "./transformToElementVector";
import {createFieldChangeDetector} from "../../../lang/src/decorator/detect-field-changes/function/createFieldChangeDetector";
import {VirtualElement} from "../../../renderer";
import {ShadowAttachMode} from "../enum/ShadowAttachMode";
import {CSSDeclarationBlockGenerator, CSSInlineStyleGenerator} from "../../../tss";
import {AttributeChangeEvent} from "../interface/AttributeChangeEvent";
import {WebComponentLifecycleEvent} from "../enum/WebComponentLifecycleEvent";
import {RenderStrategy} from "../enum/RenderStrategy";
import {ApplicationContext, ComponentReflector} from "../../../di";
import {THEME} from "../../../tss/src/constant/THEME";
import {PropsChangeEvent} from "../interface/PropsChangeEvent";
import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {getObservedAttributes} from "./getObservedAttributes";
import {AttributeChangeCallbackRegistration} from "../interface/AttributeChangeCallbackRegistration";
import {getAttributeChangeCallbacks} from "./getAttributeChangeCallbacks";
import {getAttributeReferencedValue} from "./getAttributeReferencedValue";
import {ATTRIBUTE_REGISTERED} from "../constant/ATTRIBUTE_REGISTERED";
import {ATTRIBUTE_VALUE} from "../constant/ATTRIBUTE_VALUE";

export const createWebComponentClass = (config: WebComponentConfig, injectableWebComponent: ComponentImpl<any>) => {

    // custom web component extends user implemented web component class
    // which extends HTMLElement
    const CustomWebComponent = class extends injectableWebComponent {

        mounted: boolean = false;
        propsField: string;

        constructor(...args: Array<any>) {
            super();

            this.propsField = config.propsField!;

            // call all registered initializer functions for this WebComponent as BeanFactory is not
            // creating instances of WebComponents but document.createElement. Thus, we need to do it here.
            ComponentReflector.callInitializers(ComponentReflector.getInitializers(CustomWebComponent), this);

            if (config.renderStrategy === RenderStrategy.OnChanges) {

                createFieldChangeDetector(
                    this,
                    config.propsField!,
                    true,
                    this.onPropsChanged.bind(this),
                    this.onBeforePropsChange.bind(this)
                );
            }

            if (config.shadow) {

                this.attachShadow({
                    mode: config.shadowAttachMode ? config.shadowAttachMode : ShadowAttachMode.OPEN
                });
            }

            !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_INIT));

            this.init();
        }

        static get observedAttributes() {

            const attributesToObserve = getObservedAttributes(CustomWebComponent);

            // automatically allow for observeAttributes restore
            if (attributesToObserve.indexOf(config.propsField!) === -1) {
                attributesToObserve.push(config.propsField!);
            }
            return attributesToObserve;
        }

        onBeforePropsChange(props: any, name: string | number | symbol, value: any): boolean {
            return this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_PROPS_CHANGE, {
                detail: <PropsChangeEvent>{
                    props,
                    name,
                    value
                }
            }))
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

            this.reflow();

            if (super.onPropsChanged) {
                return super.onPropsChanged(props, name, value);
            }
        }

        onBeforeAttributeChange(name: string, oldValue: any, newValue: any): boolean {
            return !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_ATTRIBUTE_CHANGE, {
                detail: <AttributeChangeEvent>{
                    name: name,
                    oldValue,
                    newValue
                }
            }));
        }

        registerAttribute(name: string): void {

            if (!Reflect.get(this, (ATTRIBUTE_REGISTERED + name))) {

                Object.defineProperty(this, name, {
                    set: (value: any) => {

                        Reflect.set(this, (ATTRIBUTE_VALUE + name) as string, value);

                        if (this.getAttribute(name) !== value) {
                            this.setAttribute(name, value);
                        }

                        if (config.renderStrategy === RenderStrategy.OnChanges) {
                            this.reflow();
                        }
                        return true;
                    },
                    get: (): any => Reflect.get(this, (ATTRIBUTE_VALUE + name) as string),
                });
                Reflect.set(this, (ATTRIBUTE_REGISTERED + name) as string, true);
            }
        }

        onAttributeChanged(name: string, oldValue: string, newValue: string): void {

            if (name === config.propsField) {

                if (newValue && this[name]) {
                    Object.assign(this[name], newValue);
                }

            } else {

                this.registerAttribute(name);

                this[name] = newValue;
            }

            // notify
            const attributeChangeCallbacks: Array<AttributeChangeCallbackRegistration> = getAttributeChangeCallbacks(this);

            attributeChangeCallbacks.forEach((attributeChangeCallbackRegistration: AttributeChangeCallbackRegistration) => {

                if (attributeChangeCallbackRegistration.attributeName === name) {
                    this[attributeChangeCallbackRegistration.methodName]();
                }
            });

            if (super.onAttributeChanged) {
                return super.onAttributeChanged(name, oldValue, newValue);
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

                const contextTheme = ApplicationContext.getInstance().get(THEME);

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

        createNativeElement(virtualElement: VirtualElement): Element {
            if (super.createNativeElement) {
                return super.createNativeElement(virtualElement);
            }
            return (<any>window).React.render(virtualElement);
        }

        flow = (initial: boolean = false) => {

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

                    Reflect.set(this, CHILD_ELEMENTS, elements);

                    if (initial) {
                        this.mountChildren();
                    } else {
                        this.remountChildren();
                    }
                }
            }

            this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.FLOW));
        };

        reflow() {

            if (this.mounted) {

                if (config.shadow) {
                    this.shadowRoot.innerHTML = '';
                } else {
                    this.innerHTML = '';
                }

                this.flow();

                this.remount();

                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.REFLOW));
            }
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string) {

            const attributeValue = getAttributeReferencedValue(newValue);

            const cancelled = this.onBeforeAttributeChange(name, oldValue, attributeValue);

            if (!cancelled) {
                this.onAttributeChanged(name, oldValue, attributeValue);
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
    return CustomWebComponent;
};