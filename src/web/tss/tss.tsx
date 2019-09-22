import { st } from "../../core";
import { CustomElementManager } from "../customelement/custom-element-manager";
import {
	ILifecycle,
	RenderReason
} from "../customelement/interface/ilifecycle";
import { tsx } from "../vdom";
import { IVirtualNode } from "../vdom/interface/ivirtual-node";

const camelToKebabCase = (name: string): string => {
	return name.replace(/[A-Z]/g, g => "-" + g[0].toLowerCase());
};

if (!st.tss) {
	st.tss = {
		currentTheme: {},

		generateStyleDeclaration: (
			declaration: any,
			mediaQuery: boolean = false
		) => {
			let styles = "";

			for (let selector in declaration) {
				if (declaration.hasOwnProperty(selector)) {
					if (selector.indexOf("@media") === 0) {
						styles = `${styles}\n\n${selector} {${st.tss.generateStyleDeclaration(
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

		renderStyleNode: (
			instance: any,
			tssFn?: Function,
			renderStyleFn?: Function
		): IVirtualNode | undefined => {
			// use renderStyle() function return value if function is defined
			let declaration =
				typeof renderStyleFn == "function"
					? renderStyleFn(st.tss.currentTheme)
					: null;

			// else use style template (bound in @CustomElement({ tss: ... }))
			if (!declaration) {
				declaration =
					typeof tssFn == "function"
						? tssFn(instance, st.tss.currentTheme)
						: null;
			}

			if (!declaration) {
				return;
			}

			return (
				<style type="text/css">
					{st.tss.generateStyleDeclaration(declaration)}
				</style>
			);
		},

		renderStyleTemplate(
			instance: any,
			tssFn?: Function,
			renderStyleFn?: Function
		): HTMLTemplateElement | undefined {
			const styleNode = st.tss.renderStyleNode(instance, tssFn, renderStyleFn);
			return st.dom.createElement(
				styleNode,
				document.createElement("template"),
				false
			) as HTMLTemplateElement | undefined;
		},
		setTheme(theme: any) {
			st.tss.currentTheme = theme || {};

			for (let instance of CustomElementManager.getAllInstances()) {
				if (
					((instance as ILifecycle).shouldRender!(RenderReason.THEME_CHANGE),
					{})
				) {
					(instance as ILifecycle).doRender(true /*tssOnly*/);
				}
			}
		}
	};
}
