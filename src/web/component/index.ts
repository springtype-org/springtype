// custom element needs VDOM
import "../vdom";

import "./style/index";

export { Component } from "./component";
export { StaticComponent } from "./static-component";
export { attr } from "./decorator/attr";
export { component } from "./decorator/component";
export { event } from "./decorator/event";
export { state } from "./decorator/state";
export { contextState } from "./decorator/context-state";
export { render } from "./function/render";
