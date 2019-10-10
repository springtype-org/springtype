import { StateChangeType } from "../../../core/state/interface/ion-state-change";
import { StateTrait } from "../custom-html-element";

export const state = (instanceOrType: HTMLElement | StateChangeType, name?: string | symbol): any => {
  if (!name) {
    return (instance: HTMLElement, name: string | symbol) => {
      StateTrait.addState((instance as HTMLElement).constructor, name, instanceOrType as StateChangeType);
    };
  } else {
    StateTrait.addState((instanceOrType as HTMLElement).constructor, name, StateChangeType.DEEP);
  }
};
