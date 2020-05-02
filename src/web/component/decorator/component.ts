import { st } from "../../../core";
import { ComponentFunction } from "../interface/component-function";
import { IComponentOptions } from "../interface/icomponent-options";
import { TYPE_FUNCTION } from "../../../core/lang/type-function";
import { defineComponent } from "../function/define-component";

export const component = (optionsOrElementFunction: IComponentOptions | ComponentFunction | any = undefined, functionalName?: string): any => {
  // functional use: component((scope) => { ... }, ...)
  if (typeof optionsOrElementFunction == TYPE_FUNCTION) {

    optionsOrElementFunction.functionalName = functionalName;

    // component(() => <div></div>, () => ({ div: { color: red } }), 'open')
    return defineComponent(optionsOrElementFunction as ComponentFunction);
  } else {
    // decorator use on class @component({ ... })
    return (targetClass: any) => {
      if (process.env.NODE_ENV === "development") {
        if (!(new (Object.getPrototypeOf(targetClass).prototype.constructor) instanceof st.component)) {
          throw new Error(
            `@component class ${targetClass.name} doesn't extend base class st.component. Make sure to write: class ${targetClass.name} extends st.component implements ILifecycle { ... your implementation ... }`,
          );
        }
      }
      return defineComponent(targetClass, optionsOrElementFunction as IComponentOptions);
    };
  }
};
