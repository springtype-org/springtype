import { isPrimitive } from "../lang/isPrimitive";
import { ChangeDetector } from "./ChangeDetector";
import { IOnPropChange, PropChangeType } from "./interface/IOnPropChange";

export const PROPS: any = Symbol("PROPS");

export const DEFAULT_EMPTY_PATH = "";

export type OnChangeHandler = (value: any, prevValue: any) => void;
export type OnDeepChangeHandler = (
	path: string,
	value: any,
	prevValue: any
) => void;

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

	static initProp(instance: IOnPropChange, name: string) {
		PropChangeManager.applyChangeDetection(
			instance,
			name,
			(value: any, prevValue: any) => {
				if (typeof instance.onPropChange == "function") {
					instance.onPropChange({
						type: PropChangeType.CHANGE,
						path: DEFAULT_EMPTY_PATH,
						name,
						value,
						prevValue
					});
				}
			},
			(path: string, value: any, prevValue: any) => {
				if (typeof instance.onPropChange == "function") {
					instance.onPropChange({
						type: PropChangeType.DEEP_CHANGE,
						path,
						name,
						value,
						prevValue
					});
				}
			}
		);
	}

	static conditionallyApplyDeepChangeDetection(
		value: any,
		onDeepChange: OnDeepChangeHandler
	): any {
		// only activate deep change detection if there is some function to listen to it
		if (!isPrimitive(value) && typeof onDeepChange == "function") {
			value = ChangeDetector.onChange(value, onDeepChange);
		}
		return value;
	}

	static applyChangeDetection(
		instance: any,
		name: string | symbol,
		onChange: OnChangeHandler,
		onDeepChange?: OnDeepChangeHandler
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
