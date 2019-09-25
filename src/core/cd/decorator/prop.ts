import { PropChangeType } from "../interface/ion-prop-change";
import { PropChangeManager } from "../prop-change-manager";

export const prop = (instanceOrType: HTMLElement | PropChangeType, name?: string | symbol): any => {
  if (!name) {
    return (instance: HTMLElement, name: string | symbol) => {
      PropChangeManager.addProp((instance as HTMLElement).constructor, name, instanceOrType as PropChangeType);
    };
  } else {
    PropChangeManager.addProp((instanceOrType as HTMLElement).constructor, name, PropChangeType.DEEP);
  }
};
