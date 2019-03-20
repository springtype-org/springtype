import {transformToElementVector} from "./transformToElementVector";
import {VirtualElement} from "../../../renderer";
import {CSSDeclarationBlockGenerator, CSSInlineStyleGenerator} from "../../../tss";
import {ApplicationContext, ComponentReflector} from "../../../di";
import {THEME} from "../../../tss/src/constant/THEME";
import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {getObservedAttributes} from "./getObservedAttributes";
import {getAttributeReferencedValue} from "./getAttributeReferencedValue";
import {getStyleForComponent} from "./getStyleForComponent";
import {getTemplateForComponent} from "./getTemplateForComponent";
import {getShadowForComponent} from "./getShadowForComponent";
import {getThemeForComponent} from "./getThemeForComponent";
import {getAttributeEventListenerValue} from "./getAttributeEventListenerValue";

export const createWebComponentClass = (tag: string, injectableWebComponent: ComponentImpl<any>) => {

    // custom web component extends user implemented web component class
    // which extends HTMLElement
    const CustomWebComponent = class extends injectableWebComponent {

        connected: boolean = false;

        constructor(...args: Array<any>) {
            super();

            // call all registered initializer functions for this WebComponent as BeanFactory is not
            // creating instances of WebComponents but document.createElement. Thus, we need to do it here.
            ComponentReflector.callInitializers(ComponentReflector.getInitializers(CustomWebComponent), this);
        }

        isConnected(): boolean {
            return this.connected;
        }

        static get observedAttributes() {
            return getObservedAttributes(CustomWebComponent);
        }

        shouldAttributeChange(name: string, oldValue: any, newValue: any): boolean {
            return true;
        }

        changeAttribute(name: string, newValue: string): void {
            this[name] = newValue;
        }

        disconnectChildren() {

            let cancelled = false;

            if (super.onBeforeDisconnectChildren) {
                cancelled = super.onBeforeDisconnectChildren();
            }

            if (!cancelled) {

                // TODO: Impl. true virtual DOM
                if (getShadowForComponent(CustomWebComponent)) {
                    this.shadowRoot.innerHTML = '';
                } else {
                    this.innerHTML = '';
                }

                if (super.onDisconnectChildren) {
                    super.onDisconnectChildren();
                }
            }
        }

        render(): Array<VirtualElement> {

            let cancelled = false;
            const elements: Array<VirtualElement> = [];

            if (super.onBeforeRender) {
                cancelled = super.onBeforeRender();
            }

            if (!cancelled) {

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

                if (super.onAfterRender) {
                    super.onAfterRender(elements);
                }
            }
            return elements;
        }

        createNativeElement(virtualElement: VirtualElement): Element {

            if (super.createNativeElement) {
                return super.createNativeElement(virtualElement);
            }
            return (<any>window).React.render(virtualElement);
        }

        flow = (initial: boolean = false) => {

            let cancelled = false;

            if (super.onBeforeFlow) {
                cancelled = super.onBeforeFlow(initial);
            }

            if (!cancelled) {

                const virtualElements: Array<VirtualElement> = this.render();

                if (virtualElements) {

                    const elements: Array<Element> = virtualElements
                        .filter(element => !!element)
                        .map((element) => this.createNativeElement(element));

                    if (elements.length > 0) {

                        if (getShadowForComponent(CustomWebComponent)) {
                            elements.forEach(el => this._shadowRoot.appendChild(el));
                        } else {
                            elements.forEach(el => this.appendChild(el));
                        }
                    }
                }
            }

            if (super.onFlow) {
                super.onFlow(initial);
            }
        };

        shouldReflow(): boolean {
            return true;
        }

        reflow() {

            let cancelled = false;

            if (super.onBeforeReflow) {
                cancelled = super.onBeforeReflow();
            }

            if (!cancelled && this.shouldReflow()) {

                if (this.connected) {

                    this.disconnectChildren();

                    this.flow();
                }

                if (super.onReflow) {
                    super.onReflow();
                }
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

            let cancelled = false;

            const attributeValue = getAttributeEventListenerValue(CustomWebComponent, name, newValue, this) ||
                getAttributeReferencedValue(newValue);

            if (super.onBeforeAttributeChange) {
                cancelled = super.onBeforeAttributeChange(name, oldValue, attributeValue);
            }

            if (!cancelled && this.shouldAttributeChange(name, oldValue, newValue)) {

                this.changeAttribute(name, attributeValue);

                if (super.onAttributeChanged) {
                    return super.onAttributeChanged(name, oldValue, attributeValue);
                }
            }
        }

        connect() {

            this.connected = true;

            this.flow(true);
        }

        connectedCallback() {

            let cancelled = false;

            if (super.onBeforeConnect) {
                cancelled = super.onBeforeConnect();
            }

            if (!cancelled) {

                this.connect();

                if (super.onConnect) {
                    super.onConnect();
                }
            }
        }
    };
    return CustomWebComponent;
};