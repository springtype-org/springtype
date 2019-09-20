import { PropChangeType } from "../../../core";
import { ITypedStyleSheet } from "../../tss";
import { IVirtualNode } from "../../vdom/interface/IVirtualNode";

export enum RenderReason {
	CONNECT = "CONNECT",
	PROP_CHANGE = "PROP_CHANGE",
	ATTRIBUTE_CHANGE = "ATTRIBUTE_CHANGE"
}

export interface RenderReasonMetaData {
	// prop or attribute name
	name: string;
	// only in case of prop and deep change
	path: string;
	// only in case of prop change
	type: PropChangeType;
	// new value
	value: any;
	// previous value
	prevValue: any;
}

export interface ILifecycle {
	// before the component gets mounted to the DOM
	onBeforeConnect?(): void;

	// after the component gets mounted to the DOM
	onConnect?(): void;

	// prior to removal from the DOM
	onBeforeDisconnect?(): void;

	// after the component has been unmounted from the DOM
	onDisconnect?(): void;

	// before attribute changes get accepted
	shouldAttributeChange?(name: string, value: any, prevValue: any): boolean;

	// after an attribute got set
	onAttributeChange?(name: string, value: any, prevValue: any): void;

	// before render(). Return false to skip render
	shouldRender?(reason: RenderReason, meta?: RenderReasonMetaData): boolean;

	// before render()
	onBeforeRender?(): void;

	// after render()
	onAfterRender?(): void;

	// after first render()
	onAfterInitialRender?(): void;

	// implement this and return TSX to be rendered
	render?(): IVirtualNode;

	// implement this and return TSS for the markup to be styled
	renderStyle?(theme?: any): ITypedStyleSheet;
}
