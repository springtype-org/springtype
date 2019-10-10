export const ATTRS: unique symbol = Symbol("ATTRS");

export class AttrTrait {
  static enableFor(instance: any) {
    // add change detection / reflection for all @attrs
    for (let attributeName of instance[ATTRS] || []) {
      Object.defineProperty(instance, attributeName, {
        get: () => {
          return instance.getAttribute(attributeName);
        },
        set: (value: any) => {
          instance.setAttribute(attributeName, value);
        },
      });
    }
    delete instance[ATTRS]; // cleanup temp. registry
  }
}
