import { IVirtualNode } from "../../vdom/interface";
import { Component } from "../component";

export type ComponentFunction = (scope: Component) => () => IVirtualNode;
