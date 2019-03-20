import {CHILD_ELEMENTS} from "../constant/CHILD_ELEMENTS";
import {transformToElementVector} from "./transformToElementVector";
import {VirtualElement} from "../../../renderer";
import {ShadowAttachMode} from "../enum/ShadowAttachMode";
import {CSSDeclarationBlockGenerator, CSSInlineStyleGenerator} from "../../../tss";
import {AttributeChangeEvent} from "../interface/AttributeChangeEvent";
import {WebComponentLifecycleEvent} from "../enum/WebComponentLifecycleEvent";
import {ApplicationContext, ComponentReflector} from "../../../di";
import {THEME} from "../../../tss/src/constant/THEME";
import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {getObservedAttributes} from "./getObservedAttributes";
import {getAttributeReferencedValue} from "./getAttributeReferencedValue";
import {getStyleForComponent} from "./getStyleForComponent";
import {getTemplateForComponent} from "./getTemplateForComponent";
import {getShadowAttachModeForComponent} from "./getShadowAttachModeForComponent";
import {getShadowForComponent} from "./getShadowForComponent";
import {getThemeForComponent} from "./getThemeForComponent";
import {log} from "../../../logger";
import {getAttributeEventListenerValue} from "./getAttributeEventListenerValue";

export const createWebComponentClass = (tag: string, injectableWebComponent: ComponentImpl<any>) => {

    const _shadowRoots = new WeakMap();

    // custom web component extends user implemented web component class
    // which extends HTMLElement
    const CustomWebComponent = class extends injectableWebComponent {

        mounted: boolean = false;

        constructor(...args: Array<any>) {
            super();

            // call all registered initializer functions for this WebComponent as BeanFactory is not
            // creating instances of WebComponents but document.createElement. Thus, we need to do it here.
            ComponentReflector.callInitializers(ComponentReflector.getInitializers(CustomWebComponent), this);

            const shadow = getShadowForComponent(CustomWebComponent);

            if (shadow) {

                const shadowAttachMode = getShadowAttachModeForComponent(CustomWebComponent);
                const shadowRoot = this.attachShadow({
                    mode: shadowAttachMode ? shadowAttachMode : ShadowAttachMode.OPEN
                });
                _shadowRoots.set(this, shadowRoot);
            }

            !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_INIT));

            this.init();

        }

        static get observedAttributes() {
            return getObservedAttributes(CustomWebComponent);
        }

        init(): void {

            if (super.init) {
                super.init();
            }
            this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.INIT));
        }

        shouldAttributeChange(name: string, oldValue: any, newValue: any): boolean {
            return true;
        }

        onBeforeAttributeChange(name: string, oldValue: any, newValue: any): boolean {

            return !this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.BEFORE_ATTRIBUTE_CHANGE, {
                detail: <AttributeChangeEvent>{
                    name: name,
                    oldValue,
                    newValue
                }
            })) && !this.shouldAttributeChange(name, oldValue, newValue);
        }

        onAttributeChanged(name: string, oldValue: string, newValue: string): void {

            this[name] = newValue;

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

        unmountChildren() {

            if (super.unmountChildren) {
                super.unmountChildren();
            }

            if (getShadowForComponent(CustomWebComponent)) {
                this.shadowRoot.innerHTML = '';
            } else {
                this.innerHTML = '';
            }
            this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.UNMOUNT_CHILDREN));
        }

        unmount() {

            if (super.unmount) {
                super.unmount();
            }
            this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.UNMOUNT));
        }

        render(): VirtualElement[] {

            log('render virtual', this.tagName);

            const elements: VirtualElement[] = [];
            const style = getStyleForComponent(CustomWebComponent);

            // generate and inject styles
            if (style) {

                const contextTheme = ApplicationContext.getInstance().get(THEME);
                const componentTheme = getThemeForComponent(CustomWebComponent);

                const theme = {
                    ...contextTheme ? contextTheme : {},
                    ...componentTheme ? componentTheme : {}
                };

                transformToElementVector(
                    elements,
                    CSSDeclarationBlockGenerator.generate(style(this, theme))
                );

                // support for :component selector (self-referenced component styles) works even in shadow DOM
                const componentInlineStyle: any =
                    CSSInlineStyleGenerator.generateComponentStyles(style(this, theme));

                for (let styleAttributeName in componentInlineStyle) {

                    if (componentInlineStyle.hasOwnProperty(styleAttributeName)) {
                        this.style[styleAttributeName] = componentInlineStyle[styleAttributeName];
                    }
                }
            }

            if (super.render) {

                transformToElementVector(elements, super.render());

            } else {

                const template = getTemplateForComponent(CustomWebComponent);

                if (typeof template === 'function') {
                    transformToElementVector(elements, template(this));
                }
            }
            this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.RENDER));


            //console.log('render', elements);

            return elements;
        }

        createNativeElement(virtualElement: VirtualElement): Element {
            if (super.createNativeElement) {
                return super.createNativeElement(virtualElement);
            }

            log('render native', this.tagName);

            return (<any>window).React.render(virtualElement);
        }

        flow = (initial: boolean = false) => {

            const virtualElements: VirtualElement[] = this.render();

            if (virtualElements) {

                const elements: Element[] = virtualElements
                    .filter(element => !!element)
                    .map((element) => this.createNativeElement(element));

                if (elements.length > 0) {

                    if (getShadowForComponent(CustomWebComponent)) {
                        elements.forEach(el => _shadowRoots.get(this).appendChild(el));
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

        shouldReflow(): boolean {
            return true;
        }

        reflow() {

            if (this.mounted && this.shouldReflow()) {

                this.unmountChildren();

                this.flow();

                this.remount();

                this.dispatchEvent(new CustomEvent(WebComponentLifecycleEvent.REFLOW));
            }
        }

        shouldReflowOnAttributeChange(attributeName: string, oldValue: any, newValue: any): boolean {
            return true;
        }

        reflowOnAttributeChange(attributeName: string, oldValue: any, newValue: any) {

            if (this.shouldReflowOnAttributeChange(attributeName, oldValue, newValue)) {
                this.reflow();
            }
        }

        attributeChangedCallback(name: string, oldValue: string, newValue: string) {

            const attributeValue = getAttributeEventListenerValue(CustomWebComponent, name, newValue, this) || getAttributeReferencedValue(newValue);
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