import { CustomElementManager } from "../custom-element-manager";

export const attr = (): any => {
	return (instance: any, attributeName: string) => {
		CustomElementManager.initAttribute(attributeName, instance);
	};
};
