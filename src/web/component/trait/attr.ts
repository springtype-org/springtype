import { st } from "../../../core";
import { AttrType } from "../interface/attr-type";

export const ATTRS: string = "ATTRS";

export type AttrTypeList = AttrType.DOM_TRANSPARENT | AttrType.DOM_INTRANSPARENT;

export const DEFAULT_ATTR_TYPE = AttrType.DOM_INTRANSPARENT;

export interface IInternalAttrEntry {
  name: string;
  type: AttrType;
}

export class AttrTrait {
  static enableFor(instance: any) {
    const attrs = Object.getPrototypeOf(instance).constructor[ATTRS] || {};

    // add change detection / reflection for all @attrs
    for (let name in attrs) {
      Object.defineProperty(instance, name, {
        get: () => {
          return instance.getAttribute(name);
        },
        set: (value: any) => {
          instance.setAttribute(name, value);
        },
        configurable: true
      });
    }
  }

  static getType(instance: any, name: string) {
    const attributeDecorations = Object.getPrototypeOf(instance).constructor[ATTRS] || {};
    if (!attributeDecorations[name]) return DEFAULT_ATTR_TYPE;
    return attributeDecorations[name].type;
  }

  static addAttr(ctor: any, name: string, type: AttrType) {
    // validate
    if (process.env.NODE_ENV === "development") {
      // test and warn for uppercase characters because DOM will lowercase them
      if (type === AttrType.DOM_TRANSPARENT && /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(name!.toString())) {
        st.warn(`The attribute ${ctor.name}.${name} is DOM_TRANSPARENT and thus has a bad naming. It should be like: ${name.toLowerCase()}`);
      }

      if (st.dom.isStandardHTMLAttribute(name)) {
        st.error(`The attribute ${ctor.name}.${name} is a standard HTML element attribute. It's value would be written directly to this.el, hiding away from @attr. Please choose a different name.`);
      }
    }

    // init cache
    if (!ctor[ATTRS]) {
      ctor[ATTRS] = {};
    }

    // register
    ctor[ATTRS][name] = {
      name,
      type,
    };
  }
}
