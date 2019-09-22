import { st } from "../../core";
import { CustomElementManager } from "../customelement/custom-element-manager";
import { tsx } from "../vdom";
import { IVirtualNode } from "../vdom/interface/ivirtual-node";

const camelToKebabCase = (name: string): string => {
	return name.replace(/[A-Z]/g, g => "-" + g[0].toLowerCase());
};

if (!st.tss) {
	st.tss = {
		generateDeclaration: (declaration: any, mediaQuery: boolean = false) => {
			let styles = "";

			for (let selector in declaration) {
				if (declaration.hasOwnProperty(selector)) {
					if (selector.indexOf("@media") === 0) {
						styles = `${styles}\n\n${selector} {${st.tss.generateDeclaration(
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
		},

		render: (
			instance: any,
			tssFn?: Function,
			renderStyleFn?: Function
		): IVirtualNode | undefined => {
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
				<style type="text/css">{st.tss.generateDeclaration(declaration)}</style>
			);
		},

		setTheme<T = {}>(theme: T) {
			console.log(
				"setting theme",
				theme,
				CustomElementManager.getAllInstances()
			);

			// TODO: Trigger re-render renderStyle() on all custom element instances
			// TODO: Needs a split of renderTSX and renderTSS
			// TODO: Second parameter for renderTSS function/tpl function
		}

		/*
	getTheme<T = {}>(): T {
		return {};
	}*/
	};
}
