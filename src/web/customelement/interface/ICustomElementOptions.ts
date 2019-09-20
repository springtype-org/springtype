import { ITypedStyleSheet } from "../../tss";
import { IVirtualNode } from "../../vdom/interface/IVirtualNode";

export type ShadowAttachMode = "open" | "closed" | "none";

export interface ICustomElementOptions {
	tpl?: (customElementInstance?: any) => IVirtualNode;
	tss?: (customElementInstance?: any) => ITypedStyleSheet;
	shadowMode?: ShadowAttachMode;
}
