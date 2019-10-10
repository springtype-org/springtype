import { st } from "../../../core";
import { IVirtualNode } from "../../vdom/interface";
import { CustomHTMLElement, defineCustomElement } from "../custom-html-element";
import { ICustomElementOptions, ShadowAttachMode } from "../interface/icustom-element-options";
import { RenderStyleFunction } from "../interface/icustom-html-element";

export type ElementFunction = (scope: CustomHTMLElement) => () => IVirtualNode;

export const customElement = (tagName: string, optionsOrElementFunction?: ICustomElementOptions | ElementFunction, renderStyleFunction?: RenderStyleFunction, shadowMode?: ShadowAttachMode): any => {
  // functional use: customElement('tag-name', (scope) => { ... }, ...)
  if (typeof optionsOrElementFunction == "function") {
    // customElement('tag-name', () => <div></div>, () => ({ div: { color: red } }), 'open')
    return defineCustomElement(
      tagName,
      class extends st.element {
        constructor() {
          super();
          this.render = (optionsOrElementFunction as ElementFunction)(this);
        }
      },
      {
        shadowMode,
        tss: renderStyleFunction,
      },
    );
  } else {
    // decorator use on class @customElement('tag-name', { ... })
    return (targetClass: any) => {
      return defineCustomElement(tagName, targetClass, optionsOrElementFunction as ICustomElementOptions);
    };
  }
};
