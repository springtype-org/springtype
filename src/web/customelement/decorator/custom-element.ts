import { st } from "../../../core";
import { IVirtualNode } from "../../vdom/interface";
import { CustomHTMLElement, defineCustomElement } from "../custom-html-element";
import { ICustomElementOptions } from "../interface/icustom-element-options";
import { RenderStyleFunction } from "../interface/icustom-html-element";

export type ElementFunction = (scope: CustomHTMLElement) => () => IVirtualNode;

export const customElement = (optionsOrElementFunction?: ICustomElementOptions | ElementFunction, renderStyleFunction?: RenderStyleFunction): any => {
  // functional use: customElement((scope) => { ... }, ...)
  if (typeof optionsOrElementFunction == "function") {
    // customElement(() => <div></div>, () => ({ div: { color: red } }), 'open')
    return defineCustomElement(optionsOrElementFunction as ElementFunction, {
      tss: renderStyleFunction,
    });

  } else {
    // decorator use on class @customElement({ ... })
    return (targetClass: any) => {
      if (process.env.NODE_ENV === "development") {
        if (Object.getPrototypeOf(targetClass) !== st.element) {
          throw new Error(
            `@customElement class ${targetClass.name} doesn't extend base class st.element. Make sure to write: class ${targetClass.name} extends st.element implements ILifecycle { ... your implementation ... }`,
          );
        }
      }
      return defineCustomElement(targetClass, optionsOrElementFunction as ICustomElementOptions);
    };
  }
};
