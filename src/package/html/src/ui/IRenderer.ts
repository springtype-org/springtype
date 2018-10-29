import {IReactCreateElement} from "./TSXRenderer";

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
export interface IRenderer {

    createElement(name: string, attributes?: any, ...children: Array<IReactCreateElement>): IReactCreateElement;

    render(reactCreateElementInput: IReactCreateElement): any;
}