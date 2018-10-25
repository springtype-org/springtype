import {CREATE_ELEMENT_ARGUMENTS_METADATA, ICreateElement, TSXRenderer} from "./TSXRenderer";


class TSXRendererSN extends TSXRenderer {
    /**
     * Original DOM/native createElementNS implementation reference.
     */
    protected _nativeCreateElementNS: Function = document.createElementNS.bind(document);

    constructor(private namespace: string) {
        super();
    }


    setAttribute(element: Element, name: string, value: any): void {
        element.setAttributeNS(null, name, value);
    }

    nativeCreateElement(tagName: string, nativeOptions?: any): Element {
        return this._nativeCreateElementNS(this.namespace, tagName, nativeOptions);
    }

    transform(element: HTMLElement): Element  {
        const input: ICreateElement = Reflect.get(element, CREATE_ELEMENT_ARGUMENTS_METADATA);
        console.log('transform input', input);
        super.createElement(input.name, input.attributes, input.children);
        return element
    }
}

export const TSXSvgRenderer = new TSXRendererSN('http://www.w3.org/2000/svg');
export const RenderSVG = TSXSvgRenderer.transform;