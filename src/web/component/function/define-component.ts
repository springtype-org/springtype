import { IComponentOptions } from "../interface";
import { newUniqueComponentName } from "../../vdom";
import { st } from "../../../core";
import { GlobalCache } from "../../../core/st/interface/i$st";

export const defineComponent = (targetClassOrFunction: any, options: IComponentOptions = {}) => {

  const componentIdent = targetClassOrFunction.name || newUniqueComponentName();

  // register with element registry
  st[GlobalCache.COMPONENT_REGISTRY][componentIdent] = targetClassOrFunction;
  st[GlobalCache.COMPONENT_WEAKMAP].set(targetClassOrFunction, componentIdent);

  // assign options to be used in CustomElement derived class constructor
  targetClassOrFunction.COMPONENT_OPTIONS = options;

  // return enhanced class / function
  return targetClassOrFunction;
};
