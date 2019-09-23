import { st } from "../../../core";
import { defineCustomElement } from "../custom-html-element";
import { ICustomElementOptions, ShadowAttachMode } from "../interface/icustom-element-options";
import { RenderFunction, RenderStyleFunction } from "../interface/icustom-html-element";

export const customElement = function(
  tagName: string,
  optionsOrRenderFunction?: ICustomElementOptions | RenderFunction,
  renderStyleFunction?: RenderStyleFunction,
  shadowMode?: ShadowAttachMode,
): any {
  // functional use: customElement('tag-name', (scope) => { ... }, ...)
  if (typeof optionsOrRenderFunction == "function") {
    // customElement('tag-name', () => <div></div>, () => ({ div: { color: red } }), 'open')
    return defineCustomElement(tagName, class extends st.element {}, {
      shadowMode,
      tpl: optionsOrRenderFunction as RenderFunction,
      tss: renderStyleFunction,
    });
  } else {
    // decorator use on class @customElement('tag-name', { ... })
    return (targetClass: any) => {
      return defineCustomElement(tagName, targetClass, optionsOrRenderFunction as ICustomElementOptions);
    };
  }
};
