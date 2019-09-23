import { ITypedStyleSheet } from "../../tss/interface";
import { IVirtualNode } from "../../vdom/interface";

export { ICustomHTMLElement } from "../custom-html-element";

export type RenderFunction = (instance: any) => IVirtualNode;
export type RenderStyleFunction = (
	instance: any,
	theme?: any
) => ITypedStyleSheet;
