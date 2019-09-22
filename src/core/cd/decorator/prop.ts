import { PropChangeManager } from "../prop-change-manager";

export const prop = (): any => {
	return (instance: any, name: string | symbol) => {
		PropChangeManager.addProp(instance.constructor, name);
	};
};
