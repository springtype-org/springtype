import { ChangeType } from "../../../core/cd/interface/change-type";
import { ILifecycle } from "../interface/ilifecycle";
import { StateTrait } from "../trait/state";

export const state = (prototypeOrType: ILifecycle | ChangeType, name?: string | symbol): any => {
  if (!name) {
    return (instance: ILifecycle, name: string | symbol) => {
      StateTrait.addState((instance as ILifecycle).constructor, name, prototypeOrType as ChangeType);
    };
  } else {
    StateTrait.addState((prototypeOrType as ILifecycle).constructor, name, ChangeType.DEEP);
  }
};
