import { st } from "../../core";
import { RenderReason } from "./interface/ILifecycle";

export const OBSERVED_ATTRIBUTES: any = Symbol("OBSERVED_ATTRIBUTES");
export const CUSTOM_ELEMENT_OPTIONS: any = Symbol("CUSTOM_ELEMENT_OPTIONS");
export const CUSTOM_ELEMENT_INSTANCES: any = Symbol("CUSTOM_ELEMENT_INSTANCES");
export const TAG_NAME: any = Symbol("TAG_NAME");

export class CustomElementManager {
	static addInstance(instance: any) {
		if (!st[CUSTOM_ELEMENT_INSTANCES]) {
			st[CUSTOM_ELEMENT_INSTANCES] = [];
		}
		st[CUSTOM_ELEMENT_INSTANCES].push(instance);
	}

	static removeInstance(instance: any) {
		let index = st[CUSTOM_ELEMENT_INSTANCES].indexOf(instance);
		if (index > -1) {
			st[CUSTOM_ELEMENT_INSTANCES].splice(index, 1);
		}
	}

	static getAllInstances(): Array<any> {
		return st[CUSTOM_ELEMENT_INSTANCES] || [];
	}

	/**
	 * Adds the attribute name provided by @Attribute('$attributeName')
	 * to the custom element class constructor property Symbol(OBSERVED_ATTRIBUTES)
	 * which is an array.
	 * @param ctor Custom element class constructor function
	 * @param attributeName Name of the attribute to observe
	 */
	static addObservedAttribute(ctor: any, attributeName: string | symbol) {
		if (!ctor[OBSERVED_ATTRIBUTES]) {
			ctor[OBSERVED_ATTRIBUTES] = [];
		}
		ctor[OBSERVED_ATTRIBUTES].push(attributeName);
	}

	static observeAttributes(instance: any, attributeNames: Array<string>) {
		for (let i = 0; i < attributeNames.length; i++) {
			CustomElementManager.observeAttribute(instance, attributeNames[i]);
		}
	}

	static observeAttribute(instance: any, name: string) {
		let value = instance[name];

		Object.defineProperty(instance, name, {
			get: () => value,
			set: (newValue: any) => {
				const prevValue = value;

				if (prevValue !== newValue) {
					// really set value
					value = newValue;

					if (
						instance.shouldRender(RenderReason.ATTRIBUTE_CHANGE, {
							name,
							value,
							prevValue
						})
					) {
						instance.render();
					}
				}
			}
		});

		/*
		PropChangeManager.initChangeDetection(
			instance,
			attributeName,
			(value: any, prevValue) => {
				CustomElementManager.changeHandler(instance, value, prevValue);
			},
			(path: string, value: any, prevValue: any) => {
				CustomElementManager.deepChangeHandler(
					instance,
					path,
					value,
					prevValue
				);
			}
		);
		*/
	}

	/*
	static deepChangeHandler(
		instance: any,
		path: string,
		value: any,
		oldValue: any
	) {
		if (
			instance.shouldRender(RenderReason.PROPERTY_CHANGE_DEEP, {
				propertyChangePath: path,
				propertyNewValue: value,
				propertyOldValue: oldValue
			})
		) {
			instance.render();
		}
	}

	static changeHandler(instance: any, value: any, prevValue: any) {
		if (
			instance.shouldRender(RenderReason.PROPERTY_CHANGE, {
				value,
				prevValue
			})
		) {
			instance.render();
		}
	}
	*/
}
