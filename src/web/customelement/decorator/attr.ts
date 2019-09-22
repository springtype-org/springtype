import { st } from "../../../core";
import { CustomElementManager } from "../custom-element-manager";

export const attr = (): any => {
	return (instance: any, attributeName: string) => {
		// test and warn for uppercase characters because DOM will lowercase them
		if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName!.toString())) {
			st.error(
				`💣 The @customElement ${instance.constructor.name} has an @attr with camelCase naming: ${attributeName}. Use kebab-case instead!`
			);
		}

		CustomElementManager.addObservedAttribute(
			instance.constructor,
			attributeName
		);
	};
};
