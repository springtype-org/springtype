import { ITypedStyleSheet } from "../../tss/interface";
import { IVirtualNode } from "../../vdom/interface";

export type IShadowAttachMode = "open" | "closed" | "none";

export interface ICustomElementOptions {
	tpl?: (customElementInstance?: any) => IVirtualNode;
	tss?: (customElementInstance?: any) => ITypedStyleSheet;
	shadowMode?: IShadowAttachMode;
}
