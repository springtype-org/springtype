import { st } from "../../core";
import { DEFAULT_EMPTY_PATH } from "../../core/cd/prop-change-manager";
import { CustomHTMLElement } from "./custom-html-element";
import { RenderReason } from "./interface/ilifecycle";

export const OBSERVED_ATTRIBUTES: any = Symbol("OBSERVED_ATTRIBUTES");
export const CUSTOM_ELEMENT_OPTIONS: any = Symbol("CUSTOM_ELEMENT_OPTIONS");
export const TAG_NAME: any = Symbol("TAG_NAME");

// used externally
export const CUSTOM_ELEMENT_INSTANCES: string = "CUSTOM_ELEMENT_INSTANCES";

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

	static observeAttribute(instance: CustomHTMLElement, attributeName: string) {
		// TODO: Check for multi instance (functional scope?!)
		// backing value (real value storage)
		let value = (instance as any)[attributeName];

		Object.defineProperty(instance, attributeName, {
			get: () => value,
			set: (newValue: any) => {
				const prevValue = value;

				if (prevValue !== newValue) {
					// really set backing value
					value = newValue;

					if (
						// don't reflow if it's the first render cycle (because attribute rendering is covered with first full render cycle)
						instance._notInitialRender &&
						// and don't render if the user land condition denies
						instance.shouldRender(RenderReason.ATTRIBUTE_CHANGE, {
							path: DEFAULT_EMPTY_PATH,
							name: attributeName,
							value,
							prevValue
						})
					) {
						instance.reflow();
					}
				}
			}
		});
	}
}
