import { error } from "../../../core";
import { CUSTOM_ELEMENT_OPTIONS, TAG_NAME } from "../CustomElementManager";
import { ICustomElementOptions } from "../interface/ICustomElementOptions";

export const CustomElement = (
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
			error(
				`💣 The @CustomElement ${targetClass.name} has no tag name! It should look like: @CustomElement('my-element', { ... }?)`
			);
		}

		// must contain a kebab-dash
		if (tagName.indexOf("-") === -1) {
			error(
				`💣 The @CustomElement ${targetClass.name}  tag name has no namespace. It should look like: my-element, but its: ${tagName}`
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
