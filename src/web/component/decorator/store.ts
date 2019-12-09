import { StoreTrait } from "../trait/store";
import { ILifecycle } from "../interface";

export const store = (
  selector: string
): any => {
  return (prototype: any, propName: string): any => {
    StoreTrait.addStoreMount((prototype as ILifecycle).constructor, propName, selector);
  };
};
