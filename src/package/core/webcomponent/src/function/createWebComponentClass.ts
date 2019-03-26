import {transformToFlatElementList} from "../../../virtualdom";
import {CSSDeclarationBlockGenerator, CSSInlineStyleGenerator} from "../../../tss";
import {ApplicationContext, ComponentReflector} from "../../../di";
import {THEME} from "../../../tss/src/constant/THEME";
import {ComponentImpl} from "../../../di/src/interface/ComponentImpl";
import {getObservedAttributes} from "./getObservedAttributes";
import {getAttributeReferencedValue} from "./getAttributeReferencedValue";
import {getStyleForComponent} from "./getStyleForComponent";
import {getTemplateForComponent} from "./getTemplateForComponent";
import {getThemeForComponent} from "./getThemeForComponent";
import {getAttributeEventListenerValue} from "./getAttributeEventListenerValue";
import {transformElementToVirtualElement} from "../../../virtualdom";
import {isWebComponent} from "./isWebComponent";
import {FlowIdReflector} from "../reflector/FlowIdReflector";
import {warn} from "../../../logger";
import {
    FRAGMENT_ELEMENT_TAG_NAME,
    LIST_KEY_ATTRIBUTE_NAME,
    SLOT_ELEMENT_TAG_NAME,
    VirtualElement
} from "../../../virtualdom";
import {SlotChildrenReflector} from "../reflector/SlotChildrenReflector";
import {ShadowRootReflector} from "../reflector/ShadowRootReflector";
import {getShadowForComponent} from "./getShadowForComponent";

export const createWebComponentClass = (tagName: string, injectableWebComponent: ComponentImpl<any>) => {

    // custom web component extends user implemented web component class
    // which extends HTMLElement
    const CustomWebComponent = class extends injectableWebComponent {

        constructor(...args: Array<any>) {
            super();

            // TODO: Implement as initializer of @Element

            // initial DOM children processing -> transform <web-component>$childNodes</web-component>
            // into an Array<VirtualElement> to be further transformed and re-rendered
            const observer = new MutationObserver((mutationsList) => {

                const webComponentNode: Node = this as unknown as Node;
                let initialChildren: Array<Element> = [];

                const addedNodes = mutationsList
                    .filter(mutation => mutation.type === 'childList')
                    .filter(mutation => mutation.addedNodes && mutation.addedNodes.length)
                    .map(mutation => mutation.addedNodes);

                addedNodes.forEach((mutationNodeList: NodeList) => {

                    initialChildren = [...initialChildren, ...mutationNodeList as unknown as Array<Element>];

                    // prevent mutation from firing re-flows by self-change
                    initialChildren = initialChildren.filter((child) =>
                        !FlowIdReflector.has(child) && !isWebComponent(child.tagName)
                    );
                });

                // ECMAScript spec. whitespace-only check
                // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM
                initialChildren = initialChildren.filter(node => (/[^\t\n\r ]/.test(node.textContent || '')));

                // must be a direct child of this component
                initialChildren = initialChildren.filter(node => node.parentNode === webComponentNode);

                if (initialChildren && initialChildren.length > 0) {

                    this.cacheSlotChildren({
                        name: tagName,
                        children: initialChildren.map(element => transformElementToVirtualElement(element))
                    }, this as unknown as Element);

                    // evict all children
                    this.innerHTML = '';

                    // queue re-flows
                    this.flow(!this.isConnected);
                }
                observer.disconnect();
            });

            observer.observe(this as unknown as Node, { childList: true });

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

                    const contextTheme = ApplicationContext.getInstance().get(THEME);
                    const componentTheme = getThemeForComponent(CustomWebComponent);

                    const theme = {
                        ...contextTheme ? contextTheme : {},
                        ...componentTheme ? componentTheme : {}
                    };

                    transformToFlatElementList(
                        elements,
                        CSSDeclarationBlockGenerator.generate(style(this, theme))
                    );

                    // support for :component selector (self-referenced component styles) works even in shadow DOM
                    const componentInlineStyle: any =
                        CSSInlineStyleGenerator.generateForStyleAttribute(style(this, theme));

                    for (let styleAttributeName in componentInlineStyle) {

                        if (componentInlineStyle.hasOwnProperty(styleAttributeName)) {
                            this.style[styleAttributeName] = componentInlineStyle[styleAttributeName];
                        }
                    }
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

        createNativeTextNode(data: string, flowId: number): Node {

            if (super.createNativeTextNode) {
                return super.createNativeTextNode(data, flowId);
            }

            const textNode = document.createTextNode(data);
            FlowIdReflector.set(textNode, flowId);
            return textNode;
        }

        createNativeElement(virtualElementOrString: VirtualElement|string, flowId: number): Element {

            if (super.createNativeElement) {
                return super.createNativeElement(virtualElementOrString, flowId);
            }
            return (<any>window).React.render(virtualElementOrString, 0, [], flowId);
        }

        /*
        updateEventListeners = (virtualElement: VirtualElement, domElement: Element, attributeName: string) => {

            debugger;

            const eventName = attributeName.substring(2, attributeName.length);
            const currentEventListeners = ElementEventListenersReflector.getEventListenersOfType(domElement, eventName);
            const eventListener = virtualElement.attributes[attributeName];

            let eventListenerFound = 0;

            // remove existing event listeners of this type
            for (let l=0; l<currentEventListeners.length; l++) {

                if (currentEventListeners[l] === eventListener) {
                    eventListenerFound++;
                }

                // prevent duplicates
                if (eventListenerFound > 1) {
                    domElement.removeEventListener(eventName, currentEventListeners[l]);
                }
            }

            // if not found, add
            if (!eventListenerFound) {

                console.log('no event listener found', eventName, eventListener);
                domElement.addEventListener(eventName, eventListener);
            }

            ElementEventListenersReflector.setEventListenersOfType(domElement, eventName, [eventListener]);
        };

        updateAllAttributeEventListeners = (virtualElement: VirtualElement, domElement: Element) => {

            if (virtualElement && virtualElement.attributes) {

                const attributes: Array<Attr> = Array.from(domElement.attributes);

                for (let a=0; a<attributes.length; a++) {

                    if (attributes[a].name.startsWith('on')) {

                        debugger;
                        this.updateEventListeners(virtualElement, domElement, attributes[a].name);
                    }
                }
            }
        };
        */

        cacheSlotChildren = (virtualElement: VirtualElement, domElement: Element) => {

            // in case a WebComponent is found, all virtual children are assigned to it's DOM element
            // so they can be assigned to <st-slot> elements inside (general purpose <slot> polyfill)
            if (virtualElement && domElement &&
                virtualElement.children && virtualElement.children.length &&
                isWebComponent(virtualElement.name)) {

                SlotChildrenReflector.set(domElement, virtualElement.children);
            }
        };

        getSlotChildrenFromParentTree = (domElement: Element): Array<VirtualElement|string> => {

            let slotChildren: Array<VirtualElement|string> = SlotChildrenReflector.get(domElement);

            if (slotChildren && slotChildren.length) {
                return slotChildren;
            } else if (domElement.parentNode && (
                    FlowIdReflector.has(domElement.parentNode) ||
                    isWebComponent((domElement.parentNode as Element).tagName)
                )) {
                return this.getSlotChildrenFromParentTree(domElement.parentNode as Element);
            }
            return slotChildren;
        };

        mutateSlotElement = (parent: Element, virtualElement: VirtualElement) => {

            if (parent) {

                const slotChildren: Array<VirtualElement|string> = this.getSlotChildrenFromParentTree(parent);

                if (slotChildren) {

                    const filteredSlotChildren = [];

                    // iterate slot children
                    for (let s=0; s<slotChildren.length; s++) {

                        const slotChild: VirtualElement|string = slotChildren[s];
                        const slotName = virtualElement.attributes ? virtualElement.attributes.name : undefined;

                        if (typeof slotChild !== 'string') {

                            const slotSelectionName = slotChild.attributes ? slotChild.attributes['slot'] : undefined;

                            // in case the <st-slot> has a name="?" attribute and the slotChild has a slot="?" attribute,
                            // the slotChild is only allowed to be slotted here, if the name matches
                            if (slotName) {

                                if (slotName === slotSelectionName) {
                                    filteredSlotChildren.push(...slotChild.children);
                                }

                            } else if (!slotSelectionName) {

                                // in case of <slot> without name and no slot name selection
                                filteredSlotChildren.push(...slotChild.children);
                            }

                        } else {

                            // no slot name based selection possible as it is a TextNode
                            filteredSlotChildren.push(...slotChild);
                        }
                    }

                    // set slot children only if they match, otherwise fallback to default content
                    if (filteredSlotChildren && filteredSlotChildren.length) {
                        virtualElement.children = filteredSlotChildren;
                    }
                }
            }
        };

        mutateSlotChildrenElement = (domElement: Element) => {

            // clean implicitly created elements space (slot target itself)
            domElement.childNodes.forEach((node: Node) => {
                domElement.removeChild(node);
            });
        };

        // TODO: Fix: Event listener changes -> re-renders elements
        mutateElementTree = (
            domElements: NodeListOf<Element>,
            virtualElements: Array<VirtualElement|string>,
            parent: Element,
            flowId: number
        ) => {

            // length to walk is the bigger number of both lists (reality in DOM vs. virtual DOM)
            let maxLength = domElements.length > virtualElements.length ?
                domElements.length : virtualElements.length;

            // walk through max. possible  differences on this level of the subtree
            for (let i=0; i<maxLength; i++) {

                // removeChild() called before and end of similarities is logically reached
                if (!virtualElements[i] && !domElements[i]) {
                    break;
                }

                let domElement = domElements[i];

                if (typeof virtualElements[i] === 'object') {

                    this.mutateElement(parent, domElement, virtualElements[i] as VirtualElement, flowId)

                } else {

                    this.mutateTextNode(parent, domElement, virtualElements[i] as string, flowId);
                }
            }
        };

        mutateElement = (parent: Element, domElement: Element, virtualElement: VirtualElement, flowId: number) => {

            // mutation result states (apart from atomic attribute changes)
            let created = false;
            let replaced = false;

            if (virtualElement && virtualElement.attributes && virtualElement.attributes.slot) {

                this.mutateSlotChildrenElement(domElement);

                // ignore further rendering here; this gonna be rendered somewhere else
                return;
            }

            if (virtualElement && virtualElement.name === SLOT_ELEMENT_TAG_NAME) {

                // Apply <st-slot> transformation
                this.mutateSlotElement(parent, virtualElement);
            }

            // mutation options per child element on each level:

            if (!virtualElement && domElement) {

                // DOMElement existing but no such VirtualElement: Evict zombie node
                parent.removeChild(domElement);

            } else if (virtualElement && !domElement) {

                // VirtualElement exists but no DOMElement: Append node
                domElement = this.createNativeElement(virtualElement, flowId);
                created = true;

                this.cacheSlotChildren(virtualElement, domElement);
                // this.updateAllAttributeEventListeners(virtualElement, domElement);

                // VirtualElement exists but no DOMElement: Append node
                parent.appendChild(domElement);

            } else if (virtualElement && domElement &&
                ((domElement.tagName || '').toUpperCase() !== virtualElement.name.toUpperCase())) {

                // DOMElement and VirtualElement existing but tagName differs: Replace node
                // also: DOMElement is a TextNode (typeof tagName == 'undefined') but VirtualElement is not

                // tag name differs, replace node
                parent.removeChild(domElement);

                domElement = this.createNativeElement(virtualElement, flowId);
                created = true;

                this.cacheSlotChildren(virtualElement, domElement);
                // this.updateAllAttributeEventListeners(virtualElement, domElement);

                parent.appendChild(domElement);

            } else {

                // DOMElement and VirtualElement are the same on index and tagName
                // but attributes might differ: May update attributes
                // this.updateAllAttributeEventListeners(virtualElement, domElement);

                // DOMElement might have attributes that differ from VirtualElement attributes
                // Replace attribute value then
                if (domElement.attributes) {

                    const attributes: Array<Attr> = Array.from(domElement.attributes);

                    for (let a=0; a<attributes.length; a++) {

                        const attributeName = attributes[a].name;

                        if (!attributeName.startsWith('on')) {

                            if (!virtualElement.attributes || !virtualElement.attributes[attributeName]) {

                                // DOMElement has an attribute that doesn't exist on VirtualElement attributes anymore
                                domElement.removeAttribute(attributeName);

                            } else if (domElement.getAttribute(attributeName) !== virtualElement.attributes[attributeName].toString()) {

                                if (attributeName === LIST_KEY_ATTRIBUTE_NAME) {

                                    const domElementReplacement = this.createNativeElement(virtualElement, flowId);
                                    replaced = true;

                                    this.cacheSlotChildren(virtualElement, domElementReplacement);
                                    // this.updateAllAttributeEventListeners(virtualElement, domElementReplacement);

                                    parent.replaceChild(domElementReplacement, domElement);

                                } else {

                                    // DOMElement attribute value differs from VirtualElement attribute: Update
                                    domElement.setAttribute(attributeName, virtualElement.attributes[attributeName]);
                                }
                            }
                        }
                    }
                }

                // VirtualElement might have additional attributes, DOMElement doesn't have atm
                if (!replaced && virtualElement.attributes) {

                    // update attributes
                    for (let attributeName in virtualElement.attributes) {

                        if (virtualElement.attributes.hasOwnProperty(attributeName) &&
                            !domElement.hasAttribute(attributeName) && !attributeName.startsWith('on')) {

                            // DOMElement attribute value differs from VirtualElement attribute: Set
                            domElement.setAttribute(attributeName, virtualElement.attributes[attributeName]);
                        }
                    }
                }
            }

            // process children (recursion)

            // optimization: If freshly created, all children are already perfectly rendered
            // so no need to walk through all child nodes
            if ((!created && !replaced) || isWebComponent(virtualElement.name)) {

                // parent elements must be both existing
                if (domElement && virtualElement &&

                    // and at least the existing DOM subtree
                    // or the virtual DOM subtree must be given
                    ((domElement.childNodes && domElement.childNodes.length) ||
                        (virtualElement.children && virtualElement.children.length))) {

                    // recursive call with childNodes and virtualElement childNodes
                    this.mutateElementTree(
                        domElement.childNodes as NodeListOf<Element> || [],
                        virtualElement.children,
                        domElement,
                        flowId
                    );
                }
            }
        };

        mutateTextNode = (parent: Element, domElement: Element, virtualElementTextContent: string, flowId: number) => {

            // text node content
            if (typeof virtualElementTextContent == 'undefined' && domElement) {

                // DOMElement existing but no such VirtualElement: Evict zombie node
                parent.removeChild(domElement);

            } else if (virtualElementTextContent && !domElement) {

                // VirtualElement exists but no DOMElement: Append node
                if (parent.nodeType === Node.TEXT_NODE) {
                    parent.textContent += virtualElementTextContent;
                } else {
                    parent.appendChild(this.createNativeTextNode(virtualElementTextContent, flowId));
                }

            } else if (virtualElementTextContent && domElement){

                // TextNode is present on both sides but content might differ
                // update innerText

                if (domElement.nodeType === Node.TEXT_NODE) {

                    // DOMElement remains being a TextNode
                    // ...but has changed: Reflect the change
                    if (domElement.textContent !== virtualElementTextContent) {
                        domElement.textContent = virtualElementTextContent;
                    }
                } else {

                    // VirtualElement is a TextNode now but DOMElement is not: remove and replace
                    parent.removeChild(domElement);
                    parent.appendChild(this.createNativeTextNode(virtualElementTextContent, flowId));
                }
            }
        };

        transformVirtualElementAttributes = (virtualElement: VirtualElement) => {

            // transform attributes
            if (virtualElement.attributes) {

                const mutatedAttributes: {
                    [attributeName: string]: any;
                } = {};

                for (let attributeName in virtualElement.attributes) {

                    if (virtualElement.attributes.hasOwnProperty(attributeName)) {

                        let mutatedAttributeName = attributeName;

                        // 1. Transform React className -> class
                        if (attributeName.toLowerCase() === 'classname') {
                            mutatedAttributeName = 'class';
                        }

                        mutatedAttributes[mutatedAttributeName] =
                            virtualElement.attributes[attributeName];
                    }

                }
                virtualElement.attributes = mutatedAttributes;
            }
        };

        transformVirtualElementList = (parent: VirtualElement, childrenDestination: Array<VirtualElement|string>, list: Array<VirtualElement|string>) => {

            for (let i=0; i<list.length; i++) {

                if (typeof list[i] !== 'string' &&
                    (!(list[i] as VirtualElement).attributes || typeof (list[i] as VirtualElement).attributes.key === 'undefined')) {
                    warn('The element ', parent, ' is a list (Array). Each entry in a list must have an unique "key" attribute like: key="$index". But ', list[i], 'is missing it.');
                }

                childrenDestination.push(list[i]);
            }
        };

        // TODO: Memoize
        transformVirtualElementTree = (virtualElement: VirtualElement|string): VirtualElement|string => {

            if (typeof virtualElement === 'object') {

                this.transformVirtualElementAttributes(virtualElement);

                // make sure it's a true VirtualElement, not a text node and has children to walk thru
                if (virtualElement && virtualElement.children) {

                    const nonFragmentChildren = [];

                    // 1. Filter / aggregate elements that are not <st-fragment>'s
                    for (let i=0; i<virtualElement.children.length; i++) {

                        const virtualElementChild = this.transformVirtualElementTree(virtualElement.children[i]) as VirtualElement;

                        if (typeof virtualElementChild === 'object') {

                            if (virtualElementChild.name === FRAGMENT_ELEMENT_TAG_NAME &&
                                virtualElementChild.children && virtualElementChild.children.length) {

                                for (let j=0; j<virtualElementChild.children.length; j++) {

                                    // TODO: abstract logic
                                    // flatten lists
                                    if (Array.isArray(virtualElementChild.children[j])) {
                                        this.transformVirtualElementList(virtualElement, nonFragmentChildren, virtualElementChild.children[j]);
                                    } else {

                                        nonFragmentChildren.push(this.transformVirtualElementTree(virtualElementChild.children[j]));
                                    }
                                }

                            } else {
                                // flatten lists
                                if (Array.isArray(virtualElementChild)) {
                                    this.transformVirtualElementList(virtualElement, nonFragmentChildren, virtualElementChild);
                                } else {

                                    nonFragmentChildren.push(virtualElementChild);
                                }
                            }
                        } else {
                            nonFragmentChildren.push(virtualElementChild);
                        }
                    }
                    virtualElement.children = nonFragmentChildren;
                }
            }
            return virtualElement;
        };

        doFlow() {

            let virtualElements: Array<VirtualElement> = this.render();

            if (virtualElements) {

                const root = getShadowForComponent(CustomWebComponent) ?
                    ShadowRootReflector.get(this) as Element :
                    this as unknown as Element;


                const transformed = this.transformVirtualElementTree({
                    name: tagName,
                    children: virtualElements
                });

                this.mutateElementTree(
                    root.childNodes as NodeListOf<Element>,
                    transformed && typeof transformed === 'object' ? transformed.children : [],
                    root,
                    performance.now()
                );
            }
        }

        async flow(initial: boolean = false): Promise<void> {

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

            // queue reflows
            setTimeout(() => {

                this.flow(true);
            }, 1); // TODO: Better solution?
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