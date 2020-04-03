import { IComponentOptions } from "../interface";
import { ComponentFunction } from "../interface/icomponent-function";
import { TYPE_FUNCTION } from "../../../core/lang";
import { component } from "./component";

export const staticComponent = (optionsOrElementFunction: IComponentOptions | ComponentFunction | any = undefined, functionalName?: string): any => {

  if (typeof optionsOrElementFunction === TYPE_FUNCTION) {
    optionsOrElementFunction.isStaticComponent = true;
  }
  return component(optionsOrElementFunction, functionalName);
};
