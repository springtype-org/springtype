/// <reference path="./interface/asset-import.d.ts" />

import { st } from "../../core";
import { ContextTrait } from "../../core/context";
import { removeContextChangeHandlersOfInstance } from "../../core/context/context";
import { GlobalCache } from "../../core/st/interface/i$st";
import { tsx } from "../vdom";
import { IElement, IVirtualNode } from "../vdom/interface";
import { IVirtualChild } from "../vdom/interface/ivirtual-node";
import { IComponentInternals } from "./interface/icomponent";
import { AttrTrait } from "./trait/attr";
import { mergeArrays, mergeObjects, TYPE_FUNCTION, TYPE_UNDEFINED } from "../../core/lang";
import { IRefAttribute } from "./interface/iref-attribute";
import { CLASS_ATTRIBUTE_NAME, DEFAULT_SLOT_NAME, STYLE_ATTRIBUTE_NAME } from "../vdom/dom";
import { StoreTrait } from "./trait/store";
import { EventBusTrait } from "./trait/event-bus";
import { IContextChange } from "../../core/context/interface/icontext-change-handler";
import { ILifecycle, AttrType } from "./interface";
import { callOnContextChange } from "../../core/context/function/call-on-context-change";
import { callOnMessage } from "../../core/event-bus/function/call-on-message";

export type DefaultComponentAttributes = {
    tag?: string; // allows to set a custom .el tag
    key?: string; // DOM intransparent primary key for list-like DOM structures
    ref?: IRefAttribute; // references DOM elements in component properties (@ref)
    unwrap?: boolean; // a DOM node tagged like that will disappear and it's child node(s) take it's place

    // the following attributes are just passed down to .el automatically
    id?: string;
    tabIndex?: number;
    style?: Partial<JSX.CSSStyleDeclaration>;
    class?: Array<string> | string;
    disabled?: boolean;
} & JSX.DOMAttributes /* like onClick, ... -- passed down to .el automatically */;

export class Component<A = {}> implements ILifecycle {

    // shadow functionallity that shouldn't break userland impl.
    INTERNAL: IComponentInternals;

    // typing for JSX.ElementClass @attr's
    attrs!: A & Partial<DefaultComponentAttributes & { attrs: A & Partial<DefaultComponentAttributes> }>;

    el!: HTMLElement;
    parent!: ILifecycle;
    virtualNode!: IVirtualNode;
    childComponents!: Array<ILifecycle>;
    mutationObserver!: MutationObserver;

    tag!: string;
    ref!: IRefAttribute;
    unwrap!: boolean;
    id!: string;
    tabIndex!: number | string;
    disabled!: boolean;

    constructor() {
        // internal state initialization
        this.INTERNAL = {
            attributes: {},
            options: Object.getPrototypeOf(this).constructor.COMPONENT_OPTIONS,
            resolveOnInitiallyRendered: () => {
            },
        } as IComponentInternals;

        // @attr impl.
        AttrTrait.enableFor(this);

        // @context, @onContextChange
        ContextTrait.enableFor(this);

        // @store
        StoreTrait.enableFor(this);

        // @onMessage
        EventBusTrait.enableFor(this);

        // register with global instance registry
        st[GlobalCache.COMPONENT_INSTANCES].push(this);
    }

    async renderPartial(virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>, domNode?: Element) {

        if (!domNode) {
            domNode = this.el;
        }
        st.dom.removeChildren(domNode!);
        return st.render(virtualNode as any, domNode);
    }

    async rerender() {
        const vdom = await this.renderPartial(this.render(), this.el);
        this.onAfterRender();
        return vdom;
    }

    // --- standard HTML attributes (pass-thru)

    get class(): string | Array<string> {
        return this.INTERNAL[CLASS_ATTRIBUTE_NAME] || [];
    }

    set class(classes: string | Array<string>) {
        this.INTERNAL[CLASS_ATTRIBUTE_NAME] = classes;
        if (this.el) {
            st.dom.setAttribute(CLASS_ATTRIBUTE_NAME, mergeArrays(classes, this.virtualNode.attributes[CLASS_ATTRIBUTE_NAME]), this.el, true)
        }
    }

    get style(): Partial<JSX.CSSStyleDeclaration> {
        return this.INTERNAL[STYLE_ATTRIBUTE_NAME] || {};
    }

    set style(style: Partial<JSX.CSSStyleDeclaration>) {
        this.INTERNAL[STYLE_ATTRIBUTE_NAME] = style;
        if (this.el) {
            st.dom.setAttribute(STYLE_ATTRIBUTE_NAME, mergeObjects(style, this.virtualNode.attributes[STYLE_ATTRIBUTE_NAME]), this.el, true)
        }
    }

    renderSlot(slotName: string, defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualChild | Array<IVirtualChild> {
        if (this.virtualNode.slotChildren![slotName]) {
            return (this.virtualNode.slotChildren![slotName] as IVirtualNode).children;
        }
        return defaults || <fragment />;
    }

    renderChildren(defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualNode | Array<IVirtualNode> {
        if (this.virtualNode.slotChildren![DEFAULT_SLOT_NAME]) {
            return this.virtualNode.slotChildren![DEFAULT_SLOT_NAME];
        }
        return defaults || <fragment />;
    }

    onBeforeElCreate(virtualNode: IVirtualNode) {
    }

    onAfterElCreate(el: IElement) {
    }

    onBeforeElChildrenCreate() {
    }

    onAfterElChildrenCreate() {
    }

    onBeforeConnect() {
    }

    onMessage(topicName: string, value: any) {
        callOnMessage(topicName, value, this);
    }

    onContextChange(change: IContextChange) {
        callOnContextChange(change, this);
    }

    // internal web component standard method
    connectedCallback() {
        this.INTERNAL.isConnected = true;

        awaitDisconnect(this);

        this.onConnect();

        this.doRender();

    }

    onConnect() {
    }

    onDisconnect() {
    }

    /**
     * Lifecycle method: Implement this method to dynamically accept or revoke attribute changes
     * @param name Name of the attribute
     * @param newValue Value to accept or revoke
     * @param oldValue Previous value
     */
    shouldAttributeChange(name: string, newValue: any, oldValue: any): boolean {
        return true;
    }

    /**
     * Overriding this method and not calling the super method
     * allows to fetch the original attribute value from VDOM (no DOM traversal string typecast)
     */
    getAttribute(name: string, type?: AttrType): any {
        // in case of DOM transparency and post-render time, the truth is the DOM
        if (type === AttrType.DOM_TRANSPARENT && this.el) {
            return this.el.getAttribute(name);
        }
        return this.INTERNAL.attributes[name];
    }

    /**
     * Overriding this method and not calling the super method
     * allows to take the original attribute value from VDOM (no DOM traversal string typecast)
     */
    setAttribute(name: string, value: any, type?: AttrType): void {
        const prevValue = this.getAttribute(name, type);

        if (
            this.shouldAttributeChange(name, value, prevValue)
        ) {

            // store internal attribute state value
            this.INTERNAL.attributes[name] = value;

            if (this.el) {
                // standard HTML attribute as per definition
                if ((st.dom.isStandardHTMLAttribute(name) ||
                    // type set on call of setAttribute as AttrType.DOM_TRANSPARENT
                    (typeof type !== TYPE_UNDEFINED && type === AttrType.DOM_TRANSPARENT) ||
                    // @attr(AttrType.DOM_TRANSPARENT)
                    AttrTrait.getType(this, name) === AttrType.DOM_TRANSPARENT)) {

                    // reflect to DOM (casts to string)
                    this.el.setAttribute(name, value);

                    // persist for re-renderings???
                    this.virtualNode.attributes[name] = value;
                }
            }

            // call lifecycle method
            this.onAttributeChange(name, value, prevValue);
        }
    }

    /**
     * Lifecycle method: Implement to get notified when attributes change
     */
    onAttributeChange(name: string, newValue: any, oldValue: any) {
    }

    onBeforeRender() {
    }

    render(): IVirtualNode | Array<IVirtualNode> | string {
        if (typeof this.INTERNAL.options.tpl! != TYPE_FUNCTION) {
            return <fragment />;
        }
        return this.INTERNAL.options.tpl!(this);
    }

    onAfterRefChange(refName: string, refValue: any) {
    }

    private async doRender() {

        if (!this.INTERNAL) {
            this.disconnectedCallback();
            return;
        }

        this.onBeforeRender();

        const vdom: IVirtualNode | Array<IVirtualNode> | string = this.render();

        if (!vdom) {
            throw new Error(`The render() method or the template (tpl) of <${this.constructor.name} /> must return virtual nodes.`);
        }

        const nodesToRender = Array.isArray(vdom) ? [...vdom!] : [vdom!];

        // if there isn't a prev. VDOM state, render initially
        st.renderer.render(nodesToRender, (this.el as unknown) as IElement);
        this.updateClassAndStyles();

        // resolve promises for calls on this.initiallyRendered()
        this.INTERNAL.resolveOnInitiallyRendered();

        // call lifecycle method
        this.onAfterRender();
    }

    updateClassAndStyles = () => {

        // getter returns merged results from component and virutal node
        // assignment happens to recall the setter for change detection
        // this is necessary for outer class={[...]} and outer style={{ ... }} assignments
        if (this.class && this.class.length) {
            this.class = this.class;
        }

        if (this.style && Object.keys(this.style).length) {
            this.style = this.style;
        }
    };

    onAfterRender() {
    }

    dispatchEvent<D>(eventName: string, init?: CustomEventInit<any> & { detail: D }) {
        this.el.dispatchEvent(new CustomEvent(eventName.toLowerCase(), init));
    }

    async initiallyRendered(): Promise<void> {
        if (this.el) return Promise.resolve();
        return new Promise((resolve: Function) => {
            this.INTERNAL.resolveOnInitiallyRendered = resolve;
        });
    }

    disconnectedCallback() {
        if (this.INTERNAL) {
            if (this.INTERNAL.isConnected) {
                this.INTERNAL.isConnected = false;
            } else {
                return;
            }
        }

        this.onDisconnect();

        EventBusTrait.disableFor(this);

        // purge from global instance registry
        // (e.g. doesn't retrigger render on TSS theme change)
        const index = st[GlobalCache.COMPONENT_INSTANCES].indexOf(this);
        if (index > -1) {
            st[GlobalCache.COMPONENT_INSTANCES].splice(index, 1);
        }

        // remove @context handlers
        removeContextChangeHandlersOfInstance(this);

        if (this.INTERNAL && this.INTERNAL.refs) {
            // reset @ref references
            for (let refName in this.INTERNAL.refs) {

                // @ts-ignore
                if (this.INTERNAL.refs[refName]) {

                    // sub-component GC
                    // @ts-ignore
                    disconnectComponent(this.INTERNAL.refs[refName]);
                    // GC
                    // @ts-ignore
                    delete this.INTERNAL.refs[refName];
                }
            }
        }

        // GC

        if (this.el) {
            // @ts-ignore
            delete this.el.$stComponent;
            // @ts-ignore
            delete this.el.$stComponentRef;
            delete this.el;
        }

        delete this.mutationObserver;

        delete this.virtualNode;
        delete this.parent;
        delete this.childComponents;
        delete this.INTERNAL;
    }
}


if (!st.component) {
    st.component = Component;
} else {
    if (process.env.NODE_ENV === 'development') {
        st.warn('Module component is loaded twice. Check for duplicate famework import!');
    }
}

export const getComponent = (className: string) => st[GlobalCache.COMPONENT_REGISTRY][className] as any;

export const disconnectComponent = (component: Component<any>) => {

    if (component.INTERNAL) {

        if (component.mutationObserver) {
            component.mutationObserver.disconnect();
        }

        if (component.childComponents) {
            for (let childComponent of component.childComponents) {
                disconnectComponent(childComponent as Component);
            }
        }
        component.disconnectedCallback();
    }
};

const awaitDisconnect = (component: Component<any>) => {

    const onMutation = (mutationsList: Array<MutationRecord>) => {
        for (let mutation of mutationsList) {
            if (!component.INTERNAL || !component.el) continue;

            if (Array.prototype.indexOf.call(mutation.removedNodes, component.el) > -1) {
                disconnectComponent(component);
            }
        }
    };

    if (typeof MutationObserver !== TYPE_UNDEFINED) {

        // attached component
        if (component.el.parentNode) {

            // old browsers might not call .onDisconnect() and lead to memory overhead
            // but that is a compromise that seems to be sane
            // if necessary, add: mutationobserver-shim in your application bundle
            component.mutationObserver = new MutationObserver(onMutation);
            component.mutationObserver.observe(component.el.parentNode!, {
                attributes: false,
                childList: true,
                subtree: false
            });
        } else {

            // some intermediate disconnection state
            // make sure, GC is running
            disconnectComponent(component);
        }
    }
};

if (!st.getComponent) {
    st.getComponent = getComponent;
}
