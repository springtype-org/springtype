import { INTERNAL } from "../interface/icustom-html-element";

export class ShadowDOMTrait {
  static enableFor(instance: any) {
    if (instance[INTERNAL].options.shadowMode != "none" && !instance.shadowRoot) {
      instance[INTERNAL].root = instance.attachShadow({
        mode: instance[INTERNAL].options.shadowMode as ShadowRootMode,
      });
    }
  }
}
