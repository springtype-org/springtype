import { IVirtualNode } from "../../vdom/interface/ivirtual-node";

export interface ITSS {
	generateDeclaration(declaration: any, mediaQuery?: boolean): any;

	render(
		instance: any,
		tssFn?: Function,
		renderStyleFn?: Function
	): IVirtualNode | undefined;

	setTheme<T = {}>(theme: T): void;
}
