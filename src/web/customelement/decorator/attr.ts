import { st } from "../../../core";
import { ATTRS } from "../interface/icustom-html-element";

// TODO: Functional style!

export const attr = (instance: any, attributeName: string): any => {
  if (process.env.NODE_ENV != "production") {
    // test and warn for uppercase characters because DOM will lowercase them
    if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName!.toString())) {
      st.warn(`The attribute ${attributeName} in custom element ${instance.constructor.name} has a bad naming. It should be: ${attributeName.toLowerCase()}`);
    }
  }

  // temporarily register for Object.defineProperty() calls, cleaned up later
  if (!instance[ATTRS]) {
    instance[ATTRS] = [];
  }
  instance[ATTRS].push(attributeName);
};
