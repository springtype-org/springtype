import {IRenderer} from "./IRenderer";
import {Component} from "../../../di";
import {WebAppLogger} from "../../../log";
import {
    Attribute, checkNameNs,
    DEFAULT_NAMESPACE_NAME,
    mapAttributes,
    Namespace,
    SortedAttributes
} from "./RenderUtils";

export interface IReactCreateElement {
    name: string;
    attributes?: any;
    children: Array<any>
}

interface StateHeapCache {
    [stateHeapPtr: string]: any;
}

@Component
export class TSXRenderer implements IRenderer {

    /**
     * WebComponent observeAttributes observeAttributes heap cache.
     * Global cache. Used for intermediate value transmission.
     * Memory is freed directly after the atomic transmission
     * operation (DOM -> WebComponent JS instance) has ended.
     */
    propsHeapCache: StateHeapCache = {};

    /**
     * Heap pointers are used to address a certain attribute
     * observeAttributes in transmission between DOM and WebComponent JS
     * instance.
     */
    protected propsHeapPtr: number = 0;

    /**
     * Original DOM/native createElement implementation reference.
     */
    protected _nativeCreateElement: Function = document.createElement.bind(document);
    protected _nativeCreateElementNS: Function = document.createElementNS.bind(document);

    constructor(public logger: WebAppLogger) {
        this.init();
    }

    init() {
        // don't log here
        // implement React TSX rendering API
        // (used globally by TypeScript compiler --jsx emitted code)
        (<any>window).React = this;

        // assign at global scope for the native DOM functions to instantiate
        // WebComponents using this TSX renderer
        document.createElement = (<any>window).React.render.bind((<any>window).React.createElement.bind((<any>window).React));
    }

    protected getPropsHeapPtr = (): string => {
        return 'props-' + (++(<any>window).React.propsHeapPtr);
    };

    protected appendChild = (child: string | number | boolean | Node | Array<Node>, element: Node) => {

        let childToAppend = child;

        this.logger.trace('child', child);

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

    nativeCreateElement = (tagName: string, namespaces: Namespace[], nativeOptions?: any): Element => {
        const checkResult = checkNameNs(tagName);
        const newTagName = checkResult.name;
        if (checkResult.found) {
            const tagNameSpace = namespaces.find((ns) => checkResult.ns === ns.name);
            if (tagNameSpace) {
                return this._nativeCreateElementNS(tagNameSpace.value, newTagName, nativeOptions);
            }
            // if namespace not found!! create with no namespace!
            this.logger.error("namespace not found " + checkResult.ns, checkResult);
            return this._nativeCreateElementNS(null, newTagName, nativeOptions);

        }
        const defaultNamespace = namespaces.find((ns) => DEFAULT_NAMESPACE_NAME === ns.name);
        if (defaultNamespace) {
            return this._nativeCreateElementNS(defaultNamespace.value, newTagName, nativeOptions);
        } else {
            return this._nativeCreateElement(newTagName, nativeOptions);
        }
    };

    setAttribute = (element: Element, attrib: Attribute, namespaces: Namespace[]): void => {
        const checkResult = checkNameNs(attrib.name);
        const attributeName = checkResult.name;
        if (checkResult.found || namespaces.length > 0) {
            const namespace: Namespace | undefined = namespaces
                .find((ns) => checkResult.ns != undefined && checkResult.ns.startsWith(ns.name));
            if (namespace) {
                element.setAttributeNS(namespace.value, attributeName, attrib.value);
            } else {
                element.setAttributeNS(null, attributeName, attrib.value);
            }
        } else {
            element.setAttribute(attributeName, attrib.value);
        }
    };

    createElement = (name: string, attributes?: any, ...children: Array<IReactCreateElement>): IReactCreateElement => {
        this.logger.trace('createElement', name, attributes, children);
        return {name: name, attributes: attributes, children: children};
    };

    render = (reactCreateElement: IReactCreateElement, level = 0, namespaces: Namespace[] = []): Element => {
        this.logger.trace('render', reactCreateElement, level, namespaces);
        const name = reactCreateElement.name;
        const attributes = reactCreateElement.attributes || {};
        const children = reactCreateElement.children || [];

        const nativeOptions = !!attributes.is ? {is: attributes.is} : undefined;

        delete attributes.is;
        const mappedAttributes: SortedAttributes = mapAttributes(attributes, namespaces);

        // 0. add all namespaces
        namespaces = mappedAttributes.xmlns;

        const element = this.nativeCreateElement(name, namespaces, nativeOptions);

        // 1. add all bindings
        mappedAttributes.bind.forEach((attrib) => {
            const scope: any = attrib.value;
            for (let bindName in scope) {
                if (scope.hasOwnProperty(bindName)) {
                    const view = scope[bindName];
                    view[bindName] = element;
                }
            }
        });

        // 2. add all events
        mappedAttributes.event.forEach(([n, fun]) => {
            element.addEventListener(n, evt => {
                // add element to event as second parameter
                fun(evt, element)
            }, false);
        });

        // 3. add properties
        mappedAttributes.property.forEach((attrib) => {
            const propsHeapPtr = this.getPropsHeapPtr();
            this.propsHeapCache[propsHeapPtr] = attrib.value;
            this.logger.trace('ptr', attrib.value);
            this.setAttribute(element, {name: attrib.name, value: propsHeapPtr}, namespaces);
        });
        // 4. add html stuff
        mappedAttributes.html.forEach((attrib) => {
            this.setAttribute(element, attrib, namespaces);
        });

        // 5. log error if attribute is not map able
        mappedAttributes.other.forEach((attrib) => {
            this.logger.error(`Attribute(${attrib.name}) on element ${name} is not mapped correct.`, attrib.value)
        });


        this.logger.trace('Done setting attributes for element', element);
        children
            .filter(c => !(c == null || typeof c == 'undefined')).forEach((child) => {

            //child: string | number | boolean | Node | Array<Node>
            let processSingle = (child: any) => {
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
            if (child instanceof Array) {
                child.filter(c => !(c == null || typeof c == 'undefined')).forEach(c => processSingle(c))
            } else {
                processSingle(child);
            }
        });
        return element;
    }
}