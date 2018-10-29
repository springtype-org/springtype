import {IRenderer} from "./IRenderer";
import {Component} from "../../../di";
import {WebAppLogger} from "../../../log";
import {Attributes, DEFAULT_NAMESPACE_NAME, mapAttributes} from "./RenderUtils";
import {split} from "ts-node";

export interface IReactCreateElement {
    name: string;
    attributes?: any;
    children: Array<any>
}

interface AttributeNormalization {
    [attributeName: string]: string
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

        this.logger.log('child', child);

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

    nativeCreateElement = (tagName: string, namespaces: [string, string][], nativeOptions?: any): Element => {
        const namespace = namespaces.find(([n]) => DEFAULT_NAMESPACE_NAME === n);
        if (namespace) {
            return this._nativeCreateElementNS(namespace[1], tagName, nativeOptions);
        } else {
            return this._nativeCreateElement(tagName, nativeOptions);
        }
    };

    setAttribute = (element: Element, name: string, value: any, namespaces: [string, string][]): void => {
        if (namespaces.length > 0) {
            const namespace = namespaces
                .map(([n,v])=> <[string,string]>[n.split(':').pop(),v])
                .find(([n]) => name.startsWith(n));
            if (namespace) {
                element.setAttributeNS(namespace[1], name, value);
            } else {
                element.setAttributeNS(null, name, value);
            }
        } else {
            element.setAttribute(name, value);
        }

    };

    createElement = (name: string, attributes?: any, ...children: Array<IReactCreateElement>): IReactCreateElement => {
        this.logger.log('createElement', name, attributes, children);
        return {name: name, attributes: attributes, children: children};
    };

    render = (reactCreateElement: IReactCreateElement, level = 0, namespaces: [string, string][] = []): Element => {
        this.logger.log('render', reactCreateElement, level, namespaces);
        const name = reactCreateElement.name;
        const attributes = reactCreateElement.attributes || {};
        const children = reactCreateElement.children || [];

        const nativeOptions = !!attributes.is ? {is: attributes.is} : undefined;

        delete attributes.is;
        const mappedAttributes: Attributes = mapAttributes(attributes);

        // 0. add all namespaces
        namespaces = namespaces.concat(mappedAttributes.xmlns);

        const element = this.nativeCreateElement(name, namespaces, nativeOptions);

        // 1. add all bindings
        mappedAttributes.bind.forEach(([_, v]) => {
            const scope: any = v;
            for (let bindName in scope) {
                if (scope.hasOwnProperty(bindName)) {
                    const view = scope[bindName];
                    view[bindName] = element;
                }
            }
        });

        // 2. add all events
        mappedAttributes.event.forEach(([n, v]) => {
            element.addEventListener(n, evt => {
                // add element to event as second parameter
                v(evt, element)
            }, false);
        });

        // 3. add properties
        mappedAttributes.property.forEach(([n, v]) => {
            const propsHeapPtr = this.getPropsHeapPtr();
            this.propsHeapCache[propsHeapPtr] = v;
            this.logger.log('ptr', v);
            this.setAttribute(element, n, propsHeapPtr, namespaces);
        });
        // 4. add html stuff
        mappedAttributes.html.forEach(([n, v]) => {
            this.setAttribute(element, n, v, namespaces);
        });

        // 5. log error if attribute is not map able
        mappedAttributes.other.forEach(([n, v]) => {
            this.logger.error(`Attribute(${n}) on element ${name} is not mapped correct.`, v)
        });


        this.logger.log('Done setting attributes for element', element);
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