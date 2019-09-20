import { camelToKebabCase, InjectionStrategy, st } from "../../core";
import { CustomElementManager } from "../customelement/CustomElementManager";
import { tsx } from "../vdom";
import { IVirtualNode } from "../vdom/interface/IVirtualNode";
import { ITSS } from "./interface/ITSS";

export class TSS implements ITSS {
	static init() {
		if (!st.tss) {
			st.tss = new TSS();

			// register with DI only if enabled
			// allows to inject Router in constructors
			if (st.di) {
				st.di.setClassName(TSS, "TSS");
				st.di.registerSingletonInstance(st.tss);
				st.di.setInjectionStrategyConfig(TSS, InjectionStrategy.SINGLETON);
			}
		}
	}

	static generateDeclaration(
		declaration: any,
		mediaQuery: boolean = false
	): string {
		let styles = "";

		for (let selector in declaration) {
			if (declaration.hasOwnProperty(selector)) {
				if (selector.indexOf("@media") === 0) {
					styles = `${styles}\n\n${selector} {${TSS.generateDeclaration(
						declaration[selector],
						true
					)}    \n}\n\n`;
				} else {
					let styleMapping = "";

					for (let property in declaration[selector]!) {
						if (declaration[selector]!.hasOwnProperty(property)) {
							let styleValue = (declaration[selector] as any)[property];

							// uniform to array (multiple values for one CSS property)
							if (!Array.isArray(styleValue)) {
								styleValue = [styleValue];
							}

							for (let i = 0; i < styleValue.length; i++) {
								styleMapping = `${styleMapping}\n    ${
									mediaQuery ? "    " : ""
								}${
									camelToKebabCase(property) // selector
								}: ${styleValue[i]};`;
							}
						}
					}
					styles = `${styles} \n\n${mediaQuery ? "    " : ""}${selector} {\n${
						mediaQuery ? "        " : "    "
					}${styleMapping}\n${mediaQuery ? "    " : ""}}`;
				}
			}
		}
		return styles;
	}

	static render(
		instance: any,
		tssFn?: Function,
		renderStyleFn?: Function
	): IVirtualNode | undefined {
		// use renderStyle() function return value if function is defined
		let declaration =
			typeof renderStyleFn == "function" ? renderStyleFn(instance) : null;

		// else use style template (bound in @CustomElement({ tss: ... }))
		if (!declaration) {
			declaration = typeof tssFn == "function" ? tssFn(instance) : null;
		}

		if (!declaration) {
			return;
		}

		return (
			<style type="text/css">{TSS.generateDeclaration(declaration)}</style>
		) as IVirtualNode;
	}

	setTheme<T = {}>(theme: T) {
		console.log("setting theme", theme, CustomElementManager.getAllInstances());

		// TODO: Trigger re-render renderStyle() on all custom element instances
		// TODO: Needs a split of renderTSX and renderTSS
		// TODO: Second parameter for renderTSS function/tpl function
	}

	/*
	getTheme<T = {}>(): T {
		return {};
	}*/
}
TSS.init();
