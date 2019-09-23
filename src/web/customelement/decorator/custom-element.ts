import { st } from "../../../core";
import { CustomElementManager } from "../custom-element-manager";
import {
	ICustomElementOptions,
	IFunctionalCustomElementOptions
} from "../interface/icustom-element-options";
import {
	RenderFunction,
	RenderStyleFunction
} from "../interface/icustom-html-element";

export const customElement = function(
	configOrTagName: IFunctionalCustomElementOptions | string,
	optionsOrRenderFunction?: ICustomElementOptions | RenderFunction,
	renderStyleFunction?: RenderStyleFunction
): any {
	// functional use: customElement('tag-name', (scope) => { ... }, ...)
	if (typeof optionsOrRenderFunction == "function") {
		return CustomElementManager.defineCustomElement(
			typeof configOrTagName == "string"
				? configOrTagName
				: configOrTagName.tagName,
			class extends st.element {},
			{
				shadowMode:
					typeof configOrTagName == "string"
						? undefined
						: configOrTagName.shadowMode,
				tpl: optionsOrRenderFunction as RenderFunction,
				tss: renderStyleFunction
			}
		);
	} else {
		// decorator use on class @customElement('tag-name', { ... })
		return (targetClass: any) => {
			return CustomElementManager.defineCustomElement(
				configOrTagName as string,
				targetClass,
				optionsOrRenderFunction as ICustomElementOptions
			);
		};
	}
};
