import { PropChangeManager } from "../PropChangeManager";

export function Prop(): any {
	return (instance: any, name: string | symbol) => {
		PropChangeManager.addProp(instance.constructor, name);
	};
}
