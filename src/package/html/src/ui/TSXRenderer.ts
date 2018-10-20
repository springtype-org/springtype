import {IRenderer} from "./IRenderer";
import {Component} from "../../../di";

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
     * Some standard JSX/TSX attribute names are transformed
     * so that IDE support broadened.
     */
    protected attrNormalizations: AttributeNormalization = {
        classname: 'class'
    };

    /**
     * Original DOM/native createElement implementation reference.
     */
    protected _nativeCreateElement: Function = document.createElement.bind(document);

    constructor() {
        this.init();
    }

    init() {

        console.log('init TSX renderer');

        // implement React TSX rendering API
        // (used globally by TypeScript compiler --jsx emitted code)
        (<any>window).React = this;

        // assign at global scope for the native DOM functions to instantiate
        // WebComponents using this TSX renderer
        document.createElement = (<any>window).React.createElement.bind((<any>window).React);
    }

    protected normalizeAttributeName(name: string): string {
        return this.attrNormalizations[name.toLowerCase()] || name;
    }

    protected getPropsHeapPtr(): string {
        return 'props-' + (++(<any>window).React.propsHeapPtr);
    }

    protected appendChild(child: string|number|boolean|Node|Array<Node>, element: Node) {

        let childToAppend = child;

        console.log('child', child);

        if (child instanceof Node) {

            childToAppend = child;

        } else if (
            typeof child == 'string' ||
            typeof child == 'number' ||
            typeof child == 'boolean'
        ) {

            childToAppend = document.createTextNode(child.toString());

        } else if (child instanceof Array) {

            // Array of Node
            // TODO: Array of any other type?
            child.forEach((childNode: Node) => {
                this.appendChild(childNode, element);
            });
            return element;
        }

        if (childToAppend instanceof Node) {

            return element.appendChild(
                childToAppend
            )
        }
    };

    mapName(attributeName: string): string {

        // TODO: Fixme architecture
        switch (attributeName) {

            case 'xmlnsXlink':
                return 'xmlns:xlink';
            case 'xlinkHref':
                return 'xlink:href';
            case 'className':
                return 'class';
            default:
                return attributeName
        }
    }

    nativeCreateElement(tagName: string, nativeOptions?: any): Element {



        return this._nativeCreateElement(tagName, nativeOptions);
    }

    createElement(name: string, attributes?: any, ...children: Array<any>) {

        attributes = attributes || {};

        const nativeOptions = !!attributes.is ? { is: attributes.is } : undefined;

        delete attributes.is;



        const element: any = this.nativeCreateElement(name, nativeOptions);

        // content observeAttributes vs IDL observeAttributes have many cases
        Object.entries(attributes).forEach(([name, value]) => {

            name = this.mapName(name);

            // set event handler
            if (name === 'bind') {

                const scope: any = value;

                for (let bindName in scope) {

                    if (scope.hasOwnProperty(bindName)) {
                        const view = scope[bindName];
                        view[bindName] = element;
                    }
                }

                console.log('scope', scope, 'name?', name);

            } else if (name === 'style' && typeof value !== 'string') {

                console.log('style', name, value);

            } else if (name.startsWith('on')) {

                element.addEventListener(name.substring(2, name.length), value);

                console.log('element', element, name);

            } else if (typeof value !== 'string') {

                const propsHeapPtr = this.getPropsHeapPtr();

                this.propsHeapCache[propsHeapPtr] = value;

                console.log('ptr', value);

                element.setAttribute(name, propsHeapPtr);

            } else {

                // set string HTML attribute
                element.setAttribute(this.normalizeAttributeName(name), value);
            }
        });

        console.log('Done setting attributes for element', element);

        children
            .filter(child => !(child == null || typeof child == 'undefined'))
            .forEach((child) => {
                return this.appendChild(child, element);
            });

        return element;
    }
}