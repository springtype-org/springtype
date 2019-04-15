import {RendererImpl} from "../interface/RendererImpl";
import {ActiveLogger, Component, FRAGMENT_ELEMENT_TAG_NAME, VirtualElement} from "../../../../index";
import {parseAttributeNS} from "./tsx-to-html-renderer-impl/function/parseAttributeNS";
import {NamespaceAttributesMap} from "./tsx-to-html-renderer-impl/interface/NamespaceAttributesMap";
import {collectNamespaceAttributes} from "./tsx-to-html-renderer-impl/function/collectNamespaceAttributes";
import {Namespace} from "./tsx-to-html-renderer-impl/interface/Namespace";
import {Attribute} from "./tsx-to-html-renderer-impl/interface/Attribute";
import {RuntimeDOMAttributeCacheMap} from "./tsx-to-html-renderer-impl/interface/RuntimeDOMAttributeCacheMap";
import {NamespaceAttribute} from "./tsx-to-html-renderer-impl/interface/NamespaceAttribute";
import {getInternalRenderApi} from "../function/getInternalRenderApi";
import {FlowIdReflector} from "../../../webcomponent/src/reflector/cross-instance/FlowIdReflector";
import {DEFAULT_NAMESPACE_NAME} from "./tsx-to-html-renderer-impl/constants";

@Component
export class TSXToHTMLRendererImpl implements RendererImpl {

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
    attributeValueSequence: number = 0;

    /**
     * Original DOM/native createElement implementation reference.
     */
    protected _createDOMElement: any = document.createElement.bind(document);
    protected _createDOMElementNS: any = document.createElementNS.bind(document);

    constructor(public activeLogger: ActiveLogger) {
        this.init();
    }

    cleanCaches() {
        this.attributeValueCache = {};
        this.attributeValueSequence = 0;
    }

    init() {

        // tsconfig.json tsx -> preserve
        // implement React TSX rendering API
        // (used globally by TypeScript compiler --jsx emitted code)
        (<any>window).ActiveRenderer = this;


        // assign at global scope for the native DOM functions to instantiate
        // WebComponents using this TSX renderer
        document.createElement = getInternalRenderApi().render.bind(
            getInternalRenderApi().createElement.bind((getInternalRenderApi()))
        );
    }

    createNativeElement(virtualElementOrString: VirtualElement|string, flowId: number): Element {
        return (<any>window).ActiveRenderer.render(virtualElementOrString, 0, [], flowId);
    }

    createNativeTextNode(data: string, flowId: number): Node {
        const textNode = document.createTextNode(data);
        FlowIdReflector.set(textNode, flowId);
        return textNode;
    }

    protected generateUniqueAttributeValueId = (): string => {
        return 'attr-' + (++(<any>window).ActiveRenderer.attributeValueSequence);
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

            this.activeLogger.error("No namespace found for attribute ", namespaceAttribute.ns, namespaceAttribute);

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

    render = (virtualElementOrTagName: VirtualElement|string, level = 0, namespaces: Array<Namespace> = [], flowId: number = -1): Element => {

        let name = typeof virtualElementOrTagName === 'string' ? virtualElementOrTagName : virtualElementOrTagName.name;
        let attributes = (virtualElementOrTagName as VirtualElement).attributes || {};
        let children = (virtualElementOrTagName as VirtualElement).children || [];

        const nativeOptions = !!attributes.is ? {is: attributes.is} : undefined;

        delete attributes.is;

        const namespaceAttributes: NamespaceAttributesMap = collectNamespaceAttributes(attributes, namespaces);

        // 0. add all namespaces
        namespaces = namespaceAttributes.xmlNs;

        const element = this.createDOMElement(name, namespaces, nativeOptions);

        // ...and apply common flow process id (subtree re-flow identifier)
        FlowIdReflector.set(element, flowId);

        // 1. add all bindings
        namespaceAttributes.injections.forEach((attribute: Attribute) => {

            const scope: any = attribute.value;

            for (let injectionFieldName in scope) {
                if (scope.hasOwnProperty(injectionFieldName)) {
                    const view = scope[injectionFieldName];
                    view[injectionFieldName] = element;
                }
            }
        });

        // 2. add all events
        namespaceAttributes.event.forEach(([eventName, callback]) => {

            const eventListener = callback as EventListenerOrEventListenerObject;

            //ElementEventListenersReflector.setEventListener(element, eventName, eventListener);

            element.addEventListener(eventName, eventListener);
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

                        element.appendChild(this.render(child, level + 1, namespaces, flowId));
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