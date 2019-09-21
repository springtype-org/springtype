import { PropChangeManager } from "../PropChangeManager";

export function prop(): any {
	return (instance: any, name: string | symbol) => {
		PropChangeManager.addProp(instance.constructor, name);
	};
}
