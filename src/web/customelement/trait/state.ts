import { st } from "../../../core";
import { IStateChange, StateChangeType } from "../../../core/state/interface";
import { DEFAULT_EMPTY_PATH, StateChangeManager } from "../../../core/state/state-change-manager";
import { ICustomHTMLElement } from "../interface";
import { ICustomHTMLElementInternals, INTERNAL } from "../interface/icustom-html-element";
import { RenderReason } from "../interface/ilifecycle";

export const STATE: any = Symbol("STATE");

export interface IState {
  name: string;
  type: StateChangeType;
}

export class StateTrait {
  static enableFor(instance: any) {
    const states = Object.getPrototypeOf(instance).constructor[STATE] || [];
    for (let i = 0; i < states.length; i++) {
      StateTrait.initState(instance, states[i].name, states[i].type);
    }
  }

  static addState(ctor: any, name: string | symbol, type: StateChangeType) {
    if (!ctor[STATE]) {
      ctor[STATE] = [];
    }
    ctor[STATE].push({
      name,
      type,
    });
  }

  static handleCustomElementStateChange(instance: any, change: IStateChange) {
    if (process.env.NODE_ENV != "production" && st.debug) {
      st.info("state-change-manager.ts", "@state()", change.name, "change detected on", instance, change);
    }

    // call handler method if implemented
    if (typeof instance.onStateChange == "function") {
      instance.onStateChange(change);
    }

    // if the instance never rendered yet, don't call doRender()!
    if (!(instance[INTERNAL] as ICustomHTMLElementInternals).notInitialRender) return;

    if (
      instance.shouldRender(RenderReason.PROP_CHANGE, {
        name: change.name,
        path: change.path,
        value: change.value,
        prevValue: change.prevValue,
        type: change.type,
      })
    ) {
      instance.doRender();
    }
  }

  static initState(instance: ICustomHTMLElement, name: string, type: StateChangeType) {
    StateChangeManager.onStateChange(
      instance,
      name,
      type,
      (value: any, prevValue: any) => {
        StateTrait.handleCustomElementStateChange(instance, {
          type: StateChangeType.REFERENCE,
          path: DEFAULT_EMPTY_PATH,
          name,
          value,
          prevValue,
        });
      },
      (path: string, value: any, prevValue: any) => {
        StateTrait.handleCustomElementStateChange(instance, {
          type: StateChangeType.DEEP,
          path,
          name,
          value,
          prevValue,
        });
      },
    );
  }
}
