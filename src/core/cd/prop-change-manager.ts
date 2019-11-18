import { isPrimitive } from "../lang/is-primitive";
import { st } from "../st/st";
import { ChangeDetector } from "./change-detector";
import { IOnDeepChangeHandler } from "./interface";
import { ChangeType } from "./interface/change-type";
import { IOnChangeHandler } from "./interface/ion-change-handler";
import { TYPE_FUNCTION } from "../lang/type-function";

export const DEFAULT_EMPTY_PATH = "";

export class PropChangeManager {
  static conditionallyApplyDeepChangeDetection(value: any, onDeepChange: IOnDeepChangeHandler): any {
    // only activate deep change detection if there is some function to listen to it
    if (!isPrimitive(value) && typeof onDeepChange == TYPE_FUNCTION) {
      value = ChangeDetector.onChange(value, onDeepChange);
    }
    return value;
  }

  static onChange(instance: any, name: string | symbol, type: ChangeType, onChange: IOnChangeHandler, onDeepChange?: IOnDeepChangeHandler): any {
    let value = PropChangeManager.conditionallyApplyDeepChangeDetection(instance[name], onDeepChange!);

    Object.defineProperty(instance, name, {
      get: () => value,
      set: (newValue: any) => {
        const prevValue = value;
        if (type === ChangeType.DEEP) {
          value = PropChangeManager.conditionallyApplyDeepChangeDetection(newValue, onDeepChange!);
        }
        onChange(value, prevValue);
      },
      configurable: true,
    });
    return value;
  }
}

if (!st.onStateChange) {
  st.onStateChange = PropChangeManager.onChange;
}
