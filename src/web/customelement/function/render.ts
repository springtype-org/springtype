import { IVirtualNode } from "../../vdom/interface";
import { CustomHTMLElement } from "../custom-html-element";

// curry fn
export const render = (render: (scope?: CustomHTMLElement) => IVirtualNode) => (scope?: CustomHTMLElement) => {
  return () => render(scope);
};
