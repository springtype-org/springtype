import { IDOM } from "../../vdom/interface/idom";
import { IRenderer } from "../../vdom/interface/irenderer";
import { IVirtualNodeType, IVirtualChildren, IVirtualNode } from "../../vdom/interface/ivirtual-node";

/**
 * public $st and internal st API
 */
export interface I$st {

  // --- platform global reference
  // node: global, browser: window
  globalThis: any;

  // TSX transformator function
  render: (
    type: IVirtualNodeType,
    attributes: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null,
    ...children: Array<IVirtualChildren>
  ) => Array<IVirtualNode> | IVirtualNode | undefined;

  // initial and patch (differential) rendering
  renderer: IRenderer;

  // DOM mutation abstraction
  dom: IDOM;

  // a subset of the DOM API is needed for DOM sync and SSR hydration
  domImpl: Partial<Window>;

  // renders a virtual node directly into an existing DOM node, defaults to document.body
  renderOnReady: (virtualNode: IVirtualNode, domNode?: Element) => void;
}
