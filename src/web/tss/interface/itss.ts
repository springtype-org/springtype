import { IVirtualNode } from "../../vdom/interface";

export interface ITSS {
	currentTheme: any;

	generateStyleDeclaration(declaration: any, mediaQuery?: boolean): any;

	getDeclaration(
		instance: any,
		tssFn?: Function,
		renderStyleFn?: Function
	): any;

	renderStyleSheet(
		instance: any,
		tssFn?: Function,
		renderStyleFn?: Function
	): CSSStyleSheet;

	renderStyleNode(declaration: any): IVirtualNode;

	setTheme(theme: any): void;
}
