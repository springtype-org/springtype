import {LIST_KEY_ATTRIBUTE_NAME, SLOT_ELEMENT_TAG_NAME, VirtualElement} from "../../index";
import {getRenderer} from "../../../renderer";
import {isWebComponent} from "../../../webcomponent/src/function/isWebComponent";
import {memoize} from "../../../lang";
import {FlowIdReflector} from "../../../webcomponent/src/reflector/cross-instance/FlowIdReflector";
import {SlotChildrenReflector} from "../../../webcomponent/src/reflector/cross-instance/SlotChildrenReflector";

export class VirtualDOMMutator {

    static cacheSlotChildren = (virtualElement: VirtualElement, domElement: Element) => {

        // in case a WebComponent is found, all virtual children are assigned to it's DOM element
        // so they can be assigned to <st-slot> elements inside (general purpose <slot> polyfill)
        if (virtualElement && domElement &&
            virtualElement.children && virtualElement.children.length &&
            isWebComponent(virtualElement.name)) {

            SlotChildrenReflector.set(domElement, virtualElement.children);
        }
    };

    static getSlotChildrenFromParentTree = (domElement: Element): Array<VirtualElement|string> => {

        let slotChildren: Array<VirtualElement|string> = SlotChildrenReflector.get(domElement);

        if (slotChildren && slotChildren.length) {
            return slotChildren;
        } else if (domElement.parentNode && (
            FlowIdReflector.has(domElement.parentNode) ||
            isWebComponent((domElement.parentNode as Element).tagName)
        )) {
            return VirtualDOMMutator.getSlotChildrenFromParentTree(domElement.parentNode as Element);
        }
        return slotChildren;
    };

    static mutateSlotElement = (parent: Element, virtualElement: VirtualElement) => {

        if (parent) {

            const slotChildren: Array<VirtualElement|string> = VirtualDOMMutator.getSlotChildrenFromParentTree(parent);

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

    static mutateSlotChildrenElement = (domElement: Element) => {

        // clean implicitly created elements space (slot target itself)
        domElement.childNodes.forEach((node: Node) => {
            domElement.removeChild(node);
        });
    };

    static mutateElementTree = memoize((
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

                VirtualDOMMutator.mutateElement(parent, domElement, virtualElements[i] as VirtualElement, flowId)

            } else {

                VirtualDOMMutator.mutateTextNode(parent, domElement, virtualElements[i] as string, flowId);
            }
        }
    }, [3 /* ignore flowId in memorization check */]);

    static mutateElement = (parent: Element, domElement: Element, virtualElement: VirtualElement, flowId: number) => {

        // mutation result states (apart from atomic attribute changes)
        let created = false;
        let replaced = false;

        if (virtualElement && virtualElement.attributes && virtualElement.attributes.slot) {

            VirtualDOMMutator.mutateSlotChildrenElement(domElement);

            // ignore further rendering here; this gonna be rendered somewhere else
            return;
        }

        if (virtualElement && virtualElement.name === SLOT_ELEMENT_TAG_NAME) {

            // Apply <st-slot> transformation
            VirtualDOMMutator.mutateSlotElement(parent, virtualElement);
        }

        // TODO: Inform web component and hook lifecycle like @OnSlotChildrenPrepared

        // mutation options per child element on each level:

        if (!virtualElement && domElement) {

            // DOMElement existing but no such VirtualElement: Evict zombie node
            parent.removeChild(domElement);

        } else if (virtualElement && !domElement) {

            // VirtualElement exists but no DOMElement: Append node
            domElement = getRenderer().createNativeElement(virtualElement, flowId);
            created = true;

            VirtualDOMMutator.cacheSlotChildren(virtualElement, domElement);
            // this.updateAllAttributeEventListeners(virtualElement, domElement);

            // VirtualElement exists but no DOMElement: Append node
            parent.appendChild(domElement);

        } else if (virtualElement && domElement &&
            ((domElement.tagName || '').toUpperCase() !== virtualElement.name.toUpperCase())) {

            // DOMElement and VirtualElement existing but tagName differs: Replace node
            // also: DOMElement is a TextNode (typeof tagName == 'undefined') but VirtualElement is not

            // tag name differs, replace node
            parent.removeChild(domElement);

            domElement = getRenderer().createNativeElement(virtualElement, flowId);
            created = true;

            VirtualDOMMutator.cacheSlotChildren(virtualElement, domElement);
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

                                const domElementReplacement = getRenderer().createNativeElement(virtualElement, flowId);
                                replaced = true;

                                VirtualDOMMutator.cacheSlotChildren(virtualElement, domElementReplacement);
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
                VirtualDOMMutator.mutateElementTree(
                    domElement.childNodes as NodeListOf<Element> || [],
                    virtualElement.children,
                    domElement,
                    flowId
                );
            }
        }
    };

    static mutateTextNode = (parent: Element, domElement: Element, virtualElementTextContent: string, flowId: number) => {

        // text node content
        if (typeof virtualElementTextContent == 'undefined' && domElement) {

            // DOMElement existing but no such VirtualElement: Evict zombie node
            parent.removeChild(domElement);

        } else if (virtualElementTextContent && !domElement) {

            // VirtualElement exists but no DOMElement: Append node
            if (parent.nodeType === Node.TEXT_NODE) {
                parent.textContent += virtualElementTextContent;
            } else {
                parent.appendChild(getRenderer().createNativeTextNode(virtualElementTextContent, flowId));
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
                parent.appendChild(getRenderer().createNativeTextNode(virtualElementTextContent, flowId));
            }
        }
    };
}