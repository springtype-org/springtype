import { st } from "../../core";
import { DEFAULT_EMPTY_PATH } from "../../core/cd/prop-change-manager";
import { GlobalCache } from "../../core/st/interface/i$st";
import { ICustomElementOptions } from "./interface";
import { RenderReason } from "./interface/ilifecycle";

export const CUSTOM_ELEMENT_OPTIONS: any = Symbol("CUSTOM_ELEMENT_OPTIONS");
export const TAG_NAME: any = Symbol("TAG_NAME");

export const ATTRIBUTES: any = Symbol("ATTRIBUTES");

export class CustomElementManager {
  static defineCustomElement(tagName: string, targetClass: any, options: ICustomElementOptions = {}) {
    // default to none for max. backward compatibility
    if (!options.shadowMode) {
      options.shadowMode = "open";
    }

    if (!tagName) {
      st.error(`💣 The custom element ${targetClass.name} has no tag name! It should look like: @customElement('my-element', ...) or functional: st.customElement('my-element', ...)`);
    }

    // must contain a kebab-dash for namespacing
    if (tagName.indexOf("-") === -1) {
      st.error(`💣 The custom element ${targetClass.name}'s tag name: ${tagName} has no namespace! All custom elements must be namespaced, like: my-element (whereas 'my' is the namespace).`);
    }

    // register with DOM API
    customElements.define(tagName, targetClass);

    // assign options to be used in CustomElement derived class constructor
    targetClass[TAG_NAME] = tagName;
    targetClass[CUSTOM_ELEMENT_OPTIONS] = options;

    // return enhanced class
    return targetClass;
  }

  // --- custom element instance management

  static addInstance(instance: any) {
    if (!st[GlobalCache.CUSTOM_ELEMENT_INSTANCES]) {
      st[GlobalCache.CUSTOM_ELEMENT_INSTANCES] = [];
    }
    st[GlobalCache.CUSTOM_ELEMENT_INSTANCES].push(instance);
  }

  static removeInstance(instance: any) {
    let index = st[GlobalCache.CUSTOM_ELEMENT_INSTANCES].indexOf(instance);
    if (index > -1) {
      st[GlobalCache.CUSTOM_ELEMENT_INSTANCES].splice(index, 1);
    }
  }

  // --- @attr() attribute management

  static initAttribute(attributeName: string, instance: any) {
    // test and warn for uppercase characters because DOM will lowercase them
    if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName!.toString())) {
      st.error(`💣 The custom element ${instance.constructor.name} has an @attr with camelCase naming: ${attributeName}. Use kebab-case instead!`);
    }

    if (!instance[ATTRIBUTES]) {
      instance[ATTRIBUTES] = {};
    }

    Object.defineProperty(instance, attributeName, {
      get: () => {
        return CustomElementManager.getAttribute(instance, attributeName);
      },
      set: (value: any) => {
        CustomElementManager.setAttribute(instance, attributeName, value);
      },
    });
  }

  static getAttribute(instance: any, name: any): string {
    return instance[ATTRIBUTES][name];
  }

  static setAttribute(instance: any, name: string, value: string) {
    const prevValue = instance[ATTRIBUTES][name];

    if (prevValue !== value && instance.shouldAttributeChange(name, value, prevValue)) {
      instance[ATTRIBUTES][name] = value;

      if (
        // don't reflow if it's the first render cycle (because attribute rendering is covered with first full render cycle)
        instance._notInitialRender &&
        // and don't render if the user land condition denies
        instance.shouldRender(RenderReason.ATTRIBUTE_CHANGE, {
          path: DEFAULT_EMPTY_PATH,
          name,
          value,
          prevValue,
        })
      ) {
        instance.doRender();
      }

      // call lifecycle method
      instance.onAttributeChange(name, value, prevValue);
    }
  }
}
