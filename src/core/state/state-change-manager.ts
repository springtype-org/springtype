import { ChangeDetector } from "../cd/change-detector";
import { IOnDeepChangeHandler } from "../cd/interface";
import { isPrimitive } from "../lang/is-primitive";
import { st } from "../st/st";
import { IOnChangeHandler } from "./interface/ion-change-handler";
import { StateChangeType } from "./interface/ion-state-change";

export const DEFAULT_EMPTY_PATH = "";

// TODO: Move to cd

export class StateChangeManager {
  static conditionallyApplyDeepChangeDetection(value: any, onDeepChange: IOnDeepChangeHandler): any {
    // only activate deep change detection if there is some function to listen to it
    if (!isPrimitive(value) && typeof onDeepChange == "function") {
      value = ChangeDetector.onChange(value, onDeepChange);
    }
    return value;
  }

  static onStateChange(instance: any, name: string | symbol, type: StateChangeType, onChange: IOnChangeHandler, onDeepChange?: IOnDeepChangeHandler): any {
    let value = StateChangeManager.conditionallyApplyDeepChangeDetection(instance[name], onDeepChange!);

    // TODO: Vereinheitlichen: Call zu einem event Handler!
    // TODO: Alles nach change detection
    // TODO: @cd
    // TODO: ChangeDetection.enableFor(this)

    // TODO: e.g. so auch für @state, @attr ?

    Object.defineProperty(instance, name, {
      get: () => value,
      set: (newValue: any) => {
        const prevValue = value;

        if (type === StateChangeType.DEEP) {
          value = StateChangeManager.conditionallyApplyDeepChangeDetection(newValue, onDeepChange!);
        }
        onChange(value, prevValue);
      },
    });
    return value;
  }
}

if (!st.onStateChange) {
  st.onStateChange = StateChangeManager.onStateChange;
}
