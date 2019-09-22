import { IVirtualNode } from "../../vdom/interface/ivirtual-node";

export interface ITSS {
	currentTheme: any;

	generateStyleDeclaration(declaration: any, mediaQuery?: boolean): any;

	renderStyleNode(
		instance: any,
		tssFn?: Function,
		renderStyleFn?: Function
	): IVirtualNode | undefined;

	renderStyleTemplate(
		instance: any,
		tssFn?: Function,
		renderStyleFn?: Function
	): HTMLTemplateElement | undefined;

	setTheme(theme: any): void;
}
