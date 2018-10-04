interface AttributeNormalization {
    [attributeName: string]: string
}

interface StateHeapCache {
    [stateHeapPtr: string]: any;
}

class JSXRenderer {

    stateHeapCache: StateHeapCache = {};

    protected attrNormalizations: AttributeNormalization = {
        classname: 'class'
    };

    protected stateHeapPtr: number = 0;

    constructor(protected nativeCreateElement: Function) {
    }

    protected normalizeAttributeName(name: string): string {
        return this.attrNormalizations[name.toLowerCase()] || name;
    }

    protected getStateHeapPtr(): string {
        return 'state-' + (++(<any>window).React.stateHeapPtr);
    }

    protected appendChild(child: string|Node|Array<Node>, element: Node) {

        let childToAppend = child;

        if (child instanceof Node) {

            childToAppend = child;

        } else if (typeof child == 'string') {

            childToAppend = document.createTextNode(child);

        } else if (child instanceof Array) {

            // Array of Node

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

    createElement(name: string, attributes: any, ...children: Array<any>) {

        attributes = attributes || {};

        const nativeOptions = !!attributes.is ? { is: attributes.is } : undefined;

        delete attributes.is;

        const element = this.nativeCreateElement(name, nativeOptions);

        // content attributes vs IDL attributes have many cases
        Object.entries(attributes).forEach(([name,value]) => {

            // set event handler
            if (name.startsWith('on')) {

                element[name] = value;

            } else if (typeof value !== 'string') {

                const stateHeapPtr = this.getStateHeapPtr();

                this.stateHeapCache[stateHeapPtr] = value;

                element.setAttribute(name, stateHeapPtr);

            } else {

                // set string HTML attribute
                element.setAttribute(this.normalizeAttributeName(name), value);
            }
        });

        children
            .filter(child => !(child == null || typeof child == 'undefined'))
            .forEach((child) => {
                return this.appendChild(child, element);
            });

        return element;
    }
}

// implement React JSX rendering API (used globally by TypeScript compiler --jsx emitted code)
(<any>window).React = new JSXRenderer(
    document.createElement.bind(document)
);

document.createElement = (<any>window).React.createElement;