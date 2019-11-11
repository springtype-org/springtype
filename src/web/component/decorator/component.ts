import { st } from "../../../core";
import { defineComponent } from "../component";
import { ComponentFunction } from "../interface/icomponent-function";
import { IComponentOptions } from "../interface/icomponent-options";

export const component = (optionsOrElementFunction?: IComponentOptions | ComponentFunction): any => {
  // functional use: component((scope) => { ... }, ...)
  if (typeof optionsOrElementFunction == "function") {
    // component(() => <div></div>, () => ({ div: { color: red } }), 'open')
    return defineComponent(optionsOrElementFunction as ComponentFunction);
  } else {
    // decorator use on class @component({ ... })
    return (targetClass: any) => {
      if (process.env.NODE_ENV === "development") {
        if (Object.getPrototypeOf(targetClass) !== st.component) {
          throw new Error(
            `@component class ${targetClass.name} doesn't extend base class st.component. Make sure to write: class ${targetClass.name} extends st.component implements ILifecycle { ... your implementation ... }`,
          );
        }
      }
      return defineComponent(targetClass, optionsOrElementFunction as IComponentOptions);
    };
  }
};
