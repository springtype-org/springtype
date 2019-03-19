import {RendererImpl} from "../interface/RendererImpl";
import {Component, ActiveLogger, VirtualElement, warn} from "../../../index";
import {parseAttributeNS} from "./tsx-renderer-impl/function/parseAttributeNS";
import {NamespaceAttributesMap} from "./tsx-renderer-impl/interface/NamespaceAttributesMap";
import {collectNamespaceAttributes} from "./tsx-renderer-impl/function/collectNamespaceAttributes";
import {Namespace} from "./tsx-renderer-impl/interface/Namespace";
import {DEFAULT_NAMESPACE_NAME} from "./tsx-renderer-impl/constant/DEFAULT_NAMESPACE_NAME";
import {Attribute} from "./tsx-renderer-impl/interface/Attribute";
import {RuntimeDOMAttributeCacheMap} from "./tsx-renderer-impl/interface/RuntimeDOMAttributeCacheMap";
import {NamespaceAttribute} from "./tsx-renderer-impl/interface/NamespaceAttribute";
import {getInternalRenderApi} from "../function/getInternalRenderApi";
import {FRAGMENT_ELEMENT_TAG_NAME} from "../../../webcomponent/src/constant/FRAGMENT_ELEMENT_TAG_NAME";
import {WebComponentReflector} from "../../../webcomponent/src/WebComponentReflector";


@Component
export class TSXRendererImpl implements RendererImpl {

    /**
     * WebComponent observeAttributes observeAttributes heap cache.
     * Global cache. Used for intermediate value transmission.
     * Memory is freed directly after the atomic transmission
     * operation (DOM -> WebComponent JS instance) has ended.
     */
    attributeValueCache: RuntimeDOMAttributeCacheMap = {};

    /**
     * Constantly incremented sequence to address a certain attribute
     * observeAttributes in transmission between DOM and WebComponent JS instance.
     */
    protected attributeValueSequence: number = 0;

    /**
     * Original DOM/native createElement implementation reference.
     */
    protected _createDOMElement: any = document.createElement.bind(document);
    protected _createDOMElementNS: any = document.createElementNS.bind(document);


    activeWebComponent: Element;

    renderStack: Array<any> = [];
    slotStack: Array<any> = [];

    constructor(public activeLogger: ActiveLogger) {
        this.init();
    }

    cleanCaches() {
        this.attributeValueCache = {};
        this.attributeValueSequence = 0;
        this.renderStack = [];
        this.slotStack = [];
    }

    init() {

        // tsconfig.json tsx -> preserve
        // implement React TSX rendering API
        // (used globally by TypeScript compiler --jsx emitted code)
        (<any>window).React = this;

        // assign at global scope for the native DOM functions to instantiate
        // WebComponents using this TSX renderer
        document.createElement = getInternalRenderApi().render.bind(
            getInternalRenderApi().createElement.bind((getInternalRenderApi()))
        );
    }

    protected generateUniqueAttributeValueId = (): string => {
        return 'attr-' + (++(<any>window).React.attributeValueSequence);
    };

    protected appendChild = (child: string | number | boolean | Node | Array<Node>, element: Node) => {

        let childToAppend = child;

        if (child instanceof Node) {

            childToAppend = child;

        } else if (
            typeof child == 'string' ||
            typeof child == 'number' ||
            typeof child == 'boolean'
        ) {
            childToAppend = document.createTextNode(child.toString());
        }
        if (childToAppend instanceof Node) {

            return element.appendChild(
                childToAppend
            )
        }
    };

    createDOMElement(tagName: string, namespaces: Array<Namespace> = [], nativeOptions?: any): Element {

        const namespaceAttribute: NamespaceAttribute = parseAttributeNS(tagName);
        const namespaceTagName = namespaceAttribute.name;

        if (namespaceAttribute.found) {

            const namespace = namespaces.find((ns) => namespaceAttribute.ns === ns.name);

            if (namespace) {
                return this._createDOMElementNS(namespace.value, namespaceTagName, nativeOptions);
            }

            this.activeLogger.error("No namespace found for attribute " + namespaceAttribute.ns, namespaceAttribute);

            return this._createDOMElementNS(null, namespaceTagName, nativeOptions);
        }

        const defaultNamespace = namespaces.find((ns) => DEFAULT_NAMESPACE_NAME === ns.name);

        if (defaultNamespace) {
            return this._createDOMElementNS(defaultNamespace.value, namespaceTagName, nativeOptions);
        } else {
            return this._createDOMElement(namespaceTagName, nativeOptions);
        }
    };

    setAttribute(element: Element, attribute: Attribute, namespaces: Namespace[]): void {

        const namespaceAttribute = parseAttributeNS(attribute.name);
        const attributeName = namespaceAttribute.name;

        if (namespaceAttribute.found || namespaces.length > 0) {

            const namespace: Namespace | undefined = namespaces
                .find((ns) => namespaceAttribute.ns != undefined && namespaceAttribute.ns.startsWith(ns.name));

            if (namespace) {
                element.setAttributeNS(namespace.value, attributeName, attribute.value);
            } else {
                element.setAttributeNS(null, attributeName, attribute.value);
            }
        } else {
            element.setAttribute(attributeName, attribute.value);
        }
    };

    createElement(name: string, attributes?: any, ...children: Array<VirtualElement>): VirtualElement  {
        return {
            name: name,
            attributes: attributes,
            children: children
        };
    };


    render = (virtualElementOrTagName: VirtualElement|string, level = 0, namespaces: Namespace[] = []): Element => {

        // TODO: Tree traverse equals check on VirtualElement:
        // TODO: - If only attribute change -> call setAttribute()
        // TODO: - If DOM element changes -> re-render and replace element (thus subtree)

        let name = typeof virtualElementOrTagName === 'string' ? virtualElementOrTagName : virtualElementOrTagName.name;
        let attributes = (virtualElementOrTagName as VirtualElement).attributes || {};
        let children = (virtualElementOrTagName as VirtualElement).children || [];

        const nativeOptions = !!attributes.is ? {is: attributes.is} : undefined;

        delete attributes.is;

        const namespaceAttributes: NamespaceAttributesMap = collectNamespaceAttributes(attributes, namespaces);

        // 0. add all namespaces
        namespaces = namespaceAttributes.xmlNs;

        this.renderStack.push({
            name,
            attributes,
            children,
            level,
            namespaces
        });

        if (WebComponentReflector.getAll().indexOf(name.toUpperCase()) !== -1) {

            this.activeWebComponent = this.renderStack[this.renderStack.length-1];

            console.log('render FOUND webcomponent', children);
        }

        if (attributes.slot) {

            console.log('render SLOT child', attributes, this.activeWebComponent, this.renderStack);

            this.slotStack.push({
                slotName: attributes.slot,
                target: {
                    name,
                    attributes,
                    children,
                    level,
                    namespaces
                }
            });

            // do not render, replace it as a <template> #document-fragment
            name = 'template';
        }

        const element = this.createDOMElement(name, namespaces, nativeOptions);


        // 1. add all bindings
        namespaceAttributes.bind.forEach((attribute: Attribute) => {

            const scope: any = attribute.value;

            for (let bindName in scope) {
                if (scope.hasOwnProperty(bindName)) {
                    const view = scope[bindName];
                    view[bindName] = element;
                }
            }
        });

        // 2. add all events
        namespaceAttributes.event.forEach(([eventName, callback]) => {
            element.addEventListener(eventName, evt => {
                // add element to event as second parameter
                callback(evt, element)
            }, false);
        });

        // 3. reference JS objects to properties heap cache (to de-reference them later and fetch the JS object again)
        namespaceAttributes.property.forEach((attribute: Attribute) => {

            const attributeValueId = this.generateUniqueAttributeValueId();

            this.attributeValueCache[attributeValueId] = attribute.value;

            this.setAttribute(element, {
                name: attribute.name,
                value: attributeValueId
            }, namespaces);
        });

        // 4. add html stuff
        namespaceAttributes.html.forEach((attribute: Attribute) => {
            this.setAttribute(element, attribute, namespaces);
        });

        // 5. log error if attribute is not mappable
        namespaceAttributes.other.forEach((attribute: Attribute) => {
            this.activeLogger.error(`Attribute(${attribute.name}) on element ${name} cannot be mapped.`, attribute.value)
        });

        if (name.toLowerCase() === 'st-slot') {
            console.log('render Found a SLOT', element, this.activeWebComponent, this.renderStack, this.slotStack);

            if (!attributes.name) {
                warn('Each <slot> must have a unique "name" attribute!', element);
            }

            this.slotStack.forEach((slottedItem) => {
                if (slottedItem.slotName === attributes.name) {

                    // reset children (remove default content of <slot>)
                    children = [];

                    if (slottedItem.target.children) {

                        slottedItem.target.children.forEach((slottedChild: any) => {
                            children.push(slottedChild);
                        })
                    }
                }
            });
        }

        children.filter(child => !(child == null || typeof child == 'undefined')).forEach((child) => {

            // child: string | number | boolean | Node | Array<Node>
            const append = (child: any) => {

                const _append = (child: any, element: Element) => {

                    const childType = typeof child;

                    if (childType == 'string' ||
                        childType == 'number' ||
                        childType == 'boolean' ||
                        child instanceof Node
                    ) {

                        this.appendChild(child, element);

                    } else {

                        element.appendChild(this.render(child, level + 1, namespaces));
                    }
                };

                // <st-fragment> found in sub-tree
                if (child.name === FRAGMENT_ELEMENT_TAG_NAME) {

                    // just don't render fragments, place their children one level up
                    if (child.children) {
                        child.children.forEach((childOfChild: any) => {
                            _append(childOfChild, element);
                        });
                    }

                } else {

                    _append(child, element);
                }
            };

            if (child instanceof Array) {

                child.filter(child => !(child == null || typeof child == 'undefined'))
                    .forEach(child => append(child))

            } else {

                append(child);
            }
        });

        return element;
    }
}