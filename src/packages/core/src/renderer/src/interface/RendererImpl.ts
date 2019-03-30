import {Namespace} from "../impl/tsx-to-html-renderer-impl/interface/Namespace";
import {VirtualElement} from "../../../virtualdom/src/interface/VirtualElement";
import {TSXToHTMLRendererImpl} from "../impl/TSXToHTMLRendererImpl";

/**
 * constructor must define (<any>window).React to an object implementing
 * createElement(...). window.React.createElement(...) is automatically called by
 * the generated JS code of the tsc TSX transformation.
 *
 * The interface expects a class instance to be assigned
 * to window.React like this:
 *
 * window.React = new YourCustomRenderer();
 *
 * whereas the constructor may also redefine document.createElement
 * if you need native DOM support for application-provided
 * WebComponents.
 */
export interface RendererImpl {
    createDOMElement(tagName: string, namespaces?: Array<Namespace>, domElementOptions?: any): Element;
    render(virtualElement: VirtualElement, level?: number, namespaces?: Array<Namespace>, flowId?: number): any;
    // MUST be named like that to fulfill TSX internal interface when tsconfig.json is set to "preserve"
    createElement(name: string, attributes?: any, ...children: Array<VirtualElement>): VirtualElement;
    cleanCaches(): void;
    createNativeTextNode(data: string, flowId: number): Node;
    createNativeElement(virtualElementOrString: VirtualElement|string, flowId: number): Element;
}