import { ITypedStyleSheet } from "../../tss/interface";
import { IVirtualNode } from "../../vdom/interface";

export type ShadowAttachMode = "open" | "closed" | "none";

export interface IShadowAttachModeOption {
	shadowMode?: ShadowAttachMode;
}

export interface ICustomElementOptions extends IShadowAttachModeOption {
	tpl?: (customElementInstance?: any) => IVirtualNode;
	tss?: (customElementInstance?: any) => ITypedStyleSheet;
}

export interface IFunctionalCustomElementOptions
	extends IShadowAttachModeOption {
	tagName: string;
}
