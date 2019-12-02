import { IVirtualNode } from "../../vdom/interface";
import { Component } from "../component";

// curry fn
export const render = (renderFn: (component: Component) => IVirtualNode) => (component: Component) => {
  return () => renderFn(component);
};
