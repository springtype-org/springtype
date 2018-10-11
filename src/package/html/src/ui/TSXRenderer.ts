import {IRenderer} from "./IRenderer";
import {Component} from "../../../di";
import {StringCaseTransformator} from "../../../lang/src/StringCaseTransformator";

interface AttributeNormalization {
    [attributeName: string]: string
}

interface StateHeapCache {
    [stateHeapPtr: string]: any;
}

@Component
export class TSXRenderer implements IRenderer {

    /**
     * WebComponent attributes state heap cache.
     * Global cache. Used for intermediate value transmission.
     * Memory is freed directly after the atomic transmission
     * operation (DOM -> WebComponent JS instance) has ended.
     */
    stateHeapCache: StateHeapCache = {};

    /**
     * Heap pointers are used to address a certain attribute
     * state in transmission between DOM and WebComponent JS
     * instance.
     */
    protected stateHeapPtr: number = 0;

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

    protected getStateHeapPtr(): string {
        return 'state-' + (++(<any>window).React.stateHeapPtr);
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

    nativeCreateElement(tagName: string, nativeOptions?: any): Element {
        return this._nativeCreateElement(tagName, nativeOptions);
    }

    createElement(name: string, attributes?: any, ...children: Array<any>) {

        attributes = attributes || {};

        const nativeOptions = !!attributes.is ? { is: attributes.is } : undefined;

        delete attributes.is;

        const element: any = this.nativeCreateElement(name, nativeOptions);

        // content attributes vs IDL attributes have many cases
        Object.entries(attributes).forEach(([name, value]) => {

            // set event handler
            if (name.startsWith('bind-')) {

                const scope: any = value;
                const bindName = StringCaseTransformator.kebabToCamelCase(name.substring(5, name.length));

                console.log('scope', scope, 'bindName', bindName, 'ele', element);

                // assign bound element reference by name; e.g. bind-h2 -> this.h2 = element;
                scope[bindName] = element;

            } else if (name.startsWith('on')) {

                element.addEventListener(name.substring(2, name.length), value);

                console.log('element', element, name);

            } else if (typeof value !== 'string') {

                const stateHeapPtr = this.getStateHeapPtr();

                this.stateHeapCache[stateHeapPtr] = value;

                element.setAttribute(name, stateHeapPtr);

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