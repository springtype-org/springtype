import { ITypedStyleSheet } from "../../tss";
import { IVirtualNode } from "../../vdom/interface/IVirtualNode";

export type IShadowAttachMode = "open" | "closed" | "none";

export interface ICustomElementOptions {
	tpl?: (customElementInstance?: any) => IVirtualNode;
	tss?: (customElementInstance?: any) => ITypedStyleSheet;
	shadowMode?: IShadowAttachMode;
}
