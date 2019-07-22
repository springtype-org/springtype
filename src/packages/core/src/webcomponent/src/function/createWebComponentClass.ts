import {
    transformToFlatElementList,
    VirtualDOMMutator,
    VirtualDOMTransformer,
    VirtualElement
} from "../../../virtualdom";
import {CSSDeclarationBlockGenerator, CSSInlineStyleGenerator, getTheme} from "../../../tss";
import {ComponentImpl, ComponentReflector} from "../../../di";
import {getAttributeReferencedValue} from "./getAttributeReferencedValue";
import {getAttributeEventListenerValue} from "./getAttributeEventListenerValue";
import {getObservedAttributes} from "../reflector/protoype/observedAttributes";
import {getShadowForComponent} from "../reflector/protoype/shadow";
import {getShadowRootForComponent} from "../reflector/instance/shadowRoot";
import {getStyleForComponent} from "../reflector/protoype/style";
import {getTemplateForComponent} from "../reflector/protoype/template";
import {getAttribute} from "../reflector/instance/attributes";
import {Lifecycle} from "../..";

const VIRTUAL_DOM = 'VIRTUAL_DOM';

export const createWebComponentClass = (tagName: string, injectableWebComponent: ComponentImpl<any>) => {

    // custom web component extends user implemented web component class
    // which extends HTMLElement
    const CustomWebComponent = class extends injectableWebComponent implements Lifecycle{

        constructor(...args: Array<any>) {
            super();

            // call all registered initializer functions for this WebComponent as BeanFactory is not
            // creating instances of WebComponents but document.createElement. Thus, we need to do it here.
            ComponentReflector.callInitializers(ComponentReflector.getInitializers(CustomWebComponent), this);
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

                    const contextTheme = getTheme();

                    const theme = {
                        ...contextTheme ? contextTheme : {}
                    };

                    transformToFlatElementList(
                        elements,
                        CSSDeclarationBlockGenerator.generate(style(this, theme))
                    );

                    // support for :component selector (self-referenced component styles) works even in shadow DOM
                    const componentInlineStyle: any =
                        CSSInlineStyleGenerator.generateForStyleAttribute(style(this, theme));

                    const allStyles: any = {};

                    for (let styleAttributeName in componentInlineStyle) {

                        if (componentInlineStyle.hasOwnProperty(styleAttributeName)) {

                            // cannot set directly, because browsers removed the setter / DOM API change
                            allStyles[styleAttributeName] = componentInlineStyle[styleAttributeName];
                        }
                    }

                    // @ts-ignore
                    this.style = allStyles;
                }

                if (super.render) {

                    transformToFlatElementList(elements, super.render());

                } else {

                    const template = getTemplateForComponent(CustomWebComponent);

                    if (typeof template === 'function') {
                        transformToFlatElementList(elements, template(this));
                    }
                }

                if (super.onAfterRender) {
                    super.onAfterRender(elements);
                }
            }
            return elements;
        }

        doFlow() {

            const virtualElements: Array<VirtualElement> = this.render();

            if (virtualElements) {

                const root = getShadowForComponent(CustomWebComponent) ?
                    getShadowRootForComponent(this) :
                    this as unknown as Element;

                const virtualElementRoot = VirtualDOMTransformer.transformVirtualElementTree({
                    name: tagName,
                    children: virtualElements
                });

                Reflect.set(this, VIRTUAL_DOM, virtualElementRoot);

                VirtualDOMMutator.mutateElementTree(
                    root.childNodes as NodeListOf<Element>,
                    virtualElementRoot && typeof virtualElementRoot === 'object' ?
                        virtualElementRoot.children : [],
                    root,
                    performance.now()
                );
            }
        }

        async flow(initial: boolean = false): Promise<void> {

            if (initial) {
                const observedAttributes = getObservedAttributes(injectableWebComponent);
                for (let i = 0; i < observedAttributes.length; i++) {
                    const observedAttribute = observedAttributes[i];
                    const attributeName = observedAttribute.name.toString();
                    if (attributeName.startsWith('on')) {
                        continue;
                    }
                    const value = getAttribute(this, attributeName);
                    this.setAttribute(observedAttribute.name, value);
                }
            }
            let cancelled = false;

            if (super.onBeforeFlow) {
                cancelled = super.onBeforeFlow(initial);
            }

            if (!cancelled && this.isConnected) {

                this.doFlow();

                if (super.onFlow) {
                    super.onFlow(initial);
                }
            }
        }

        shouldFlowOnAttributeChange(attributeName: string, oldValue: any, newValue: any): boolean {
            return true;
        }

        flowOnAttributeChange(attributeName: string, oldValue: any, newValue: any) {

            if (this.shouldFlowOnAttributeChange(attributeName, oldValue, newValue)) {
                this.flow();
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

        doConnect() {

            // delay initial flow so that MutationObserver for initial
            // DOM changes is called first (it's a DOM impl. timing/lifecycle glitch)
            setTimeout(() => {
                this.flow(true);
            }, 1 /* ms delay */);
        }

        connectedCallback() {

            let cancelled = false;

            if (super.onBeforeConnect) {
                cancelled = super.onBeforeConnect();
            }

            if (!cancelled) {

                this.doConnect();

                if (super.onConnect) {
                    super.onConnect();
                }
            }
        }
    };
    return CustomWebComponent;
};