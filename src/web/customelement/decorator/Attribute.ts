import { error } from "../../../core";
import { CustomElementManager } from "../CustomElementManager";

export function Attribute(): any {
	return (instance: any, attributeName: string) => {
		// test and warn for uppercase characters because DOM will lowercase them
		if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName!.toString())) {
			error(
				`💣 The @CustomElement ${instance.constructor.name} has an @Attribute with camelCase naming: ${attributeName}. Use kebab-case instead!`
			);
		}

		CustomElementManager.addObservedAttribute(
			instance.constructor,
			attributeName
		);
	};
}
