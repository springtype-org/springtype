import { IVirtualNode } from "../../vdom/interface";
import { Component } from "../component";

// curry fn
export const render = (renderFn: (scope?: Component) => IVirtualNode) => (scope?: Component) => {
  return () => renderFn(scope);
};
