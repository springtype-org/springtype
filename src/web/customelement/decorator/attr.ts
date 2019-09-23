import { st } from "../../../core";
import { ATTRS } from "../interface/icustom-html-element";

export const attr = (): any => {
  return (instance: any, attributeName: string) => {
    // test and warn for uppercase characters because DOM will lowercase them
    if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName!.toString())) {
      st.error(`💣 The custom element ${instance.constructor.name} has an @attr with camelCase naming: ${attributeName}. Use kebab-case instead!`);
    }

    // temporarily register for Object.defineProperty() calls, cleaned up later
    if (!instance[ATTRS]) {
      instance[ATTRS] = [];
    }
    instance[ATTRS].push(attributeName);
  };
};
