import { OnPropChange } from "./interface/OnPropChange";
import { PropChangeManager, PROPS } from "./PropChangeManager";

export const createDerivedChangeDetectingClass = (targetClass: any) => {
	const changeDetectingClass = class extends targetClass
		implements OnPropChange {
		constructor() {
			super();

			// activate @Prop property change detection
			PropChangeManager.initProps(this, changeDetectingClass[PROPS] || []);
		}
	};
	return changeDetectingClass;
};
