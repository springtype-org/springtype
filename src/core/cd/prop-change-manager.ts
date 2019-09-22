import { ICustomHTMLElement } from "../../web/customelement/interface";
import { RenderReason } from "../../web/customelement/interface/ilifecycle";
import { isPrimitive } from "../lang/is-primitive";
import { st } from "../st/st";
import { ChangeDetector } from "./change-detector";
import {
	IOnChangeHandler,
	IOnDeepChangeHandler
} from "./interface/ion-change-handler";
import { IPropChange, PropChangeType } from "./interface/ion-prop-change";

export const PROPS: any = Symbol("PROPS");

export const DEFAULT_EMPTY_PATH = "";

export class PropChangeManager {
	static addProp(ctor: any, name: string | symbol) {
		if (!ctor[PROPS]) {
			ctor[PROPS] = [];
		}
		ctor[PROPS].push(name);
	}

	static initProps(instance: any, names: Array<string>) {
		for (let i = 0; i < names.length; i++) {
			PropChangeManager.initProp(instance, names[i]);
		}
	}

	static handleCustomElementPropChange(instance: any, change: IPropChange) {
		// call handler method if implemented
		if (typeof instance.onPropChange == "function") {
			instance.onPropChange(change);
		}

		// if the instance never rendered yet, don't call doRender()!
		if (!instance._notInitialRender) return;

		if (
			instance.shouldRender(RenderReason.PROP_CHANGE, {
				name: change.name,
				path: change.path,
				value: change.value,
				prevValue: change.prevValue,
				type: change.type
			})
		) {
			instance.doRender();
		}
	}

	static initProp(instance: ICustomHTMLElement, name: string) {
		PropChangeManager.onPropChange(
			instance,
			name,
			(value: any, prevValue: any) => {
				PropChangeManager.handleCustomElementPropChange(instance, {
					type: PropChangeType.CHANGE,
					path: DEFAULT_EMPTY_PATH,
					name,
					value,
					prevValue
				});
			},
			(path: string, value: any, prevValue: any) => {
				PropChangeManager.handleCustomElementPropChange(instance, {
					type: PropChangeType.DEEP_CHANGE,
					path,
					name,
					value,
					prevValue
				});
			}
		);
	}

	static conditionallyApplyDeepChangeDetection(
		value: any,
		onDeepChange: IOnDeepChangeHandler
	): any {
		// only activate deep change detection if there is some function to listen to it
		if (!isPrimitive(value) && typeof onDeepChange == "function") {
			value = ChangeDetector.onChange(value, onDeepChange);
		}
		return value;
	}

	static onPropChange(
		instance: any,
		name: string | symbol,
		onChange: IOnChangeHandler,
		onDeepChange?: IOnDeepChangeHandler
	): any {
		let value = PropChangeManager.conditionallyApplyDeepChangeDetection(
			instance[name],
			onDeepChange!
		);

		Object.defineProperty(instance, name, {
			get: () => value,
			set: (newValue: any) => {
				const prevValue = value;

				value = PropChangeManager.conditionallyApplyDeepChangeDetection(
					newValue,
					onDeepChange!
				);

				onChange(value, prevValue);
			}
		});
		return value;
	}
}

if (!st.onPropChange) {
	st.onPropChange = PropChangeManager.onPropChange;
}
