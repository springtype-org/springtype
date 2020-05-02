import { ILifecycle } from "../interface/ilifecycle";
import { AttrTrait, DEFAULT_ATTR_TYPE, AttrTypeList } from "../trait/attr";
import { TYPE_OBJECT } from "../../../core/lang/type-object";
import { AttrType } from "../interface/attr-type";

export const attr = (
  typeOrPrototype: AttrType | AttrTypeList| ILifecycle = DEFAULT_ATTR_TYPE,
  propName: string | undefined = undefined,
): any => {
  if (typeof typeOrPrototype !== TYPE_OBJECT) {
    // support for @attr(ATTR_TYPE.?) with support for custom set ATTR_TYPE
    return (prototype: any, propName: string): any => {
      AttrTrait.addAttr((prototype as ILifecycle).constructor, propName, typeOrPrototype as AttrType);
    };
  } else {
    // support for @attr with default ATTR_TYPE
    AttrTrait.addAttr((typeOrPrototype as ILifecycle).constructor, propName!, DEFAULT_ATTR_TYPE);
  }
};
