import { ICustomElementOptions, ILifecycle } from ".";
import {
	error,
	OnPropChange,
	PropChange,
	removeSharedMemoryChangeHandlersOfInstance,
	warn
} from "../../core";
import { TSS } from "../tss/TSS";
import { IElement } from "../vdom/interface/IElement";
import { IVirtualNode } from "../vdom/interface/IVirtualNode";
import { Renderer } from "../vdom/Renderer";
import {
	CustomElementManager,
	CUSTOM_ELEMENT_OPTIONS,
	OBSERVED_ATTRIBUTES
} from "./CustomElementManager";
import { RenderReason, RenderReasonMetaData } from "./interface/ILifecycle";

const ROOT: any = Symbol("ROOT");
const NOT_INITIAL_RENDER: any = Symbol("NOT_INITIAL_RENDER");

export const createDerivedClass = (targetClass: any) => {
	const customElementClass = class extends targetClass
		implements ILifecycle, OnPropChange {
		constructor() {
			super();

			// register with global instance registry
			CustomElementManager.addInstance(this);

			// activate @Attribute property change detection
			CustomElementManager.observeAttributes(
				this,
				customElementClass[OBSERVED_ATTRIBUTES] || []
			);

			const options: ICustomElementOptions =
				customElementClass[CUSTOM_ELEMENT_OPTIONS];

			// default render root is this custom element instance
			this[ROOT] = this;

			// in case of "open" or "closed" shadow DOM, use shadow DOM root node
			if (options.shadowMode != "none") {
				this[ROOT] = this.attachShadow({ mode: options.shadowMode });
			}
		}

		/**
		 * Returns all attribute names provided by @Attribute decorators (@see CustomElement.addObservedAttribute).
		 * The attribute name equals the field name.
		 */
		static get observedAttributes() {
			return customElementClass[OBSERVED_ATTRIBUTES] || [];
		}

		// internal web component standard method
		connectedCallback() {
			// returning a falsifying value in an @onConnect decorated method
			// will stop the default implementation from executing
			if (!this.onConnect()) {
				if (this.shouldRender(RenderReason.CONNECT)) {
					this.render();
				}
			}
		}

		disconnectedCallback() {
			// evict from global instance registry
			// (e.g. doesn't retrigger render on TSS theme change)
			CustomElementManager.removeInstance(this);

			// remove @Shared handlers
			removeSharedMemoryChangeHandlersOfInstance(this);

			if (typeof super.onDisconnect == "function") {
				super.onDisconnect();
			}
		}

		attributeChangedCallback(name: string, oldValue: any, newValue: any) {
			if (this.shouldAttributeChange(name, newValue, oldValue)) {
				this.setAttribute(name, newValue);
			}
		}

		/**
		 * Lifecycle method: Implement this method to dynamically accept or revoke attribute changes
		 * @param name Name of the attribute
		 * @param newValue Value to accept or revoke
		 * @param oldValue Previous value
		 */
		shouldAttributeChange(name: string, newValue: any, oldValue: any): boolean {
			if (typeof super.shouldAttributeChange === "function") {
				return super.shouldAttributeChange(name, newValue, oldValue);
			}
			return true;
		}

		/**
		 * Overriding this method and not calling the super method
		 * allows to take the original attribute value from VDOM (no DOM traversal string typecast)
		 */
		setAttribute(name: string, value: any): void {
			const oldValue = this[name];

			if (oldValue !== value) {
				this[name] = value;

				// call lifecycle method
				this.onAttributeChange(name, value, oldValue);
			}
		}

		onPropChange(change: PropChange) {
			if (typeof super.onPropChange === "function") {
				super.onPropChange(change);
			}

			if (
				this.shouldRender(RenderReason.PROP_CHANGE, {
					name: change.name,
					path: change.path,
					value: change.value,
					prevValue: change.prevValue,
					type: change.type
				})
			) {
				this.render();
			}
		}

		/**
		 * Lifecycle method: Implement to get notified when attributes change
		 */
		onAttributeChange(name: string, newValue: any, oldValue: any) {
			if (typeof super.onAttributeChange === "function") {
				super.onAttributeChange(name, newValue, oldValue);
			}
		}

		/**
		 * Overriding this method and not calling the super method
		 * allows to fetch the original attribute value from VDOM (no DOM traversal string typecast)
		 */
		getAttribute(name: string): any {
			return this[name];
		}

		/**
		 * Lifecycle method: Implement to be called when the element has been added to a DOM parent element
		 */
		onConnect() {
			if (typeof super.onConnect === "function") {
				return super.onConnect();
			}
			return false;
		}

		/**
		 * Lifecycle method: Implement to conditionally revoke render actions triggered
		 */
		shouldRender(reason: RenderReason, meta?: RenderReasonMetaData): boolean {
			let isRenderRunCausedByAttributeChangeBeforeFirstRender =
				reason === RenderReason.ATTRIBUTE_CHANGE && !this[NOT_INITIAL_RENDER];

			if (typeof super.shouldRender === "function") {
				return (
					// in case a custom shouldRender method is implemented, we shall not loose
					// the condition isRenderRunCausedByAttributeChangeBeforeFirstRender but
					// we need to inverse it here as the should render is expected to return true
					// to render. So if it is the case, it's logical value must be false
					!isRenderRunCausedByAttributeChangeBeforeFirstRender &&
					super.shouldRender(reason, meta)
				);
			}

			// attribute changes might happen before the initial rendering because defaults
			// of class properties are set. This would trigger re-renderings, which are prohibited here
			if (isRenderRunCausedByAttributeChangeBeforeFirstRender) {
				return false;
			}

			// accept the render run by default
			return true;
		}

		// @ts-ignore: base-implementation that is called to call the user implemented lifecycle render() method
		render() {
			// call lifecycle method
			if (typeof super.onBeforeRender === "function") {
				super.onBeforeRender();
			}

			const options: ICustomElementOptions =
				customElementClass[CUSTOM_ELEMENT_OPTIONS];

			let vdom: IVirtualNode<any>;
			try {
				// render virtual DOM of childrens markup
				if (typeof super.render == "function") {
					vdom = super.render();
				} else if (typeof options.tpl == "function") {
					vdom = options.tpl(this);
				} else {
					warn(
						"🔥Custom element has no render() function nor valid template. Rendering nothing.",
						this
					);
				}
			} catch (e) {
				if (e.message.indexOf("tsx") > -1) {
					error(
						`💣 The function tsx of package vdom must be imported for wherever you use <tsx></tsx> syntax!`
					);
				}
				throw e;
			}

			// render virtual DOM of TSS
			const tssVdom = TSS.render(this, options.tss, super.renderStyle);

			if (!this[NOT_INITIAL_RENDER]) {
				// if there isn't a prev. VDOM state, render initially
				Renderer.renderInitial([tssVdom, vdom!], (this[
					ROOT
				] as unknown) as IElement);

				this[NOT_INITIAL_RENDER] = true;

				// call lifecycle method
				if (typeof super.onAfterInitialRender === "function") {
					super.onAfterInitialRender();
				}
			} else {
				// differential VDOM/DOM rendering algorithm
				Renderer.patch(this[ROOT].childNodes, [tssVdom, vdom!], (this[
					ROOT
				] as unknown) as IElement);
			}

			// call lifecycle method
			if (typeof super.onAfterRender === "function") {
				super.onAfterRender();
			}
		}
	};
	return customElementClass;
};
