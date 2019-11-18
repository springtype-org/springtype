import { st } from "../../../core";
import { ChangeType } from "../../../core/cd/interface/change-type";
import { DEFAULT_EMPTY_PATH, PropChangeManager } from "../../../core/cd/prop-change-manager";
import { IComponent } from "../interface";
import { IComponentInternals } from "../interface/icomponent";
import { IStateChange } from "../interface/ion-state-change";
import { RenderReason } from "../interface/irender-reason";
import { TYPE_FUNCTION } from "../../../core/lang/type-function";

export const STATE: string = "STATE";

export interface IState {
  name: string;
  type: ChangeType;
}
export class StateTrait {
  static enableFor(instance: any) {
    const states = Object.getPrototypeOf(instance).constructor[STATE] || [];
    for (let i = 0; i < states.length; i++) {
      StateTrait.initState(instance, states[i].name, states[i].type);
    }
  }

  static addState(ctor: any, name: string | symbol, type: ChangeType) {

    if (process.env.NODE_ENV === "development") {
      if (st.dom.isStandardHTMLAttribute(name as string)) {
        st.error(
          `The state ${ctor.name}.${name as string} is a standard HTML element attribute. It's value would be written directly to this.el, hiding away from @attr. Please choose a different name.`,
        );
      }
    }

    if (!ctor[STATE]) {
      ctor[STATE] = [];
    }
    ctor[STATE].push({
      name,
      type,
    });
  }

  static handleCustomElementStateChange(instance: any, change: IStateChange) {
    if (process.env.NODE_ENV === "development") {
      st.info("@state()", change.name, "change detected on", instance, change);
    }

    // call handler method if implemented
    if (typeof instance.onStateChange == TYPE_FUNCTION) {
      instance.onStateChange(change);
    }

    // if the instance never rendered yet, don't call doRender()!
    if (!(instance.INTERNAL as IComponentInternals).notInitialRender) return;

    if (
      instance.shouldRender(RenderReason.STATE_CHANGE, {
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

  static initState(instance: IComponent, name: string, type: ChangeType) {
    PropChangeManager.onChange(
      instance,
      name,
      type,
      (value: any, prevValue: any) => {
        StateTrait.handleCustomElementStateChange(instance, {
          type: ChangeType.REFERENCE,
          path: DEFAULT_EMPTY_PATH,
          name,
          value,
          prevValue,
        });
      },
      (path: string, value: any, prevValue: any) => {
        StateTrait.handleCustomElementStateChange(instance, {
          type: ChangeType.DEEP,
          path,
          name,
          value,
          prevValue,
        });
      },
    );
  }
}
