import { ILifecycle } from "../interface";
import { AttrTrait, AttrType, DEFAULT_ATTR_TYPE } from "../trait/attr";

export const attr = (type: AttrType = DEFAULT_ATTR_TYPE) => {

  return (prototype: any, name: string): any => {
    AttrTrait.addAttr((prototype as ILifecycle).constructor, name, type);
  }
};
