import { st } from "../../../core";
import { CUSTOM_ELEMENT_OPTIONS, TAG_NAME } from "../custom-element-manager";
import { ICustomElementOptions } from "../interface/icustom-element-options";

export const customElement = (
	tagName: string,
	options?: ICustomElementOptions
): any => {
	if (!options) options = {};

	// default to none for max. backward compatibility
	if (typeof options.shadowMode == "undefined") {
		options.shadowMode = "open";
	}

	return (targetClass: any) => {
		if (!tagName) {
			st.error(
				`💣 The @customElement ${targetClass.name} has no tag name! It should look like: @customElement('my-element', { ... }?)`
			);
		}

		// must contain a kebab-dash
		if (tagName.indexOf("-") === -1) {
			st.error(
				`💣 The @customElement ${targetClass.name}  tag name has no namespace. It should look like: my-element, but its: ${tagName}`
			);
		}

		// register with DOM API
		customElements.define(tagName, targetClass);

		// assign options to be used in CustomElement derived class constructor
		targetClass[TAG_NAME] = tagName;
		targetClass[CUSTOM_ELEMENT_OPTIONS] = options;

		return targetClass;
	};
};
