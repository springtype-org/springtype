import { IVirtualNode } from "../../vdom/interface/ivirtual-node";

export interface ITSS {
	currentTheme: any;

	generateDeclaration(declaration: any, mediaQuery?: boolean): any;

	render(
		instance: any,
		tssFn?: Function,
		renderStyleFn?: Function
	): IVirtualNode | undefined;

	setTheme(theme: any): void;
}
