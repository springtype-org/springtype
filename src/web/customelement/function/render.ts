import { IVirtualNode } from "../../vdom/interface";
import { CustomHTMLElement } from "../custom-html-element";

// curry fn
export const render = (renderFn: (scope?: CustomHTMLElement) => IVirtualNode) => (scope?: CustomHTMLElement) => {
  return () => renderFn(scope);
};
