import { CONTEXT_STATE_ASSIGNMENTS } from "../decorator/context-state";
import { ILifecycle, IStateChange } from "../interface";
import { RenderReason } from "../interface/irender-reason";
import { st } from "../../../core";

export class ContextStateTrait {

  static enableFor(instance: ILifecycle) {

    const prototype = Object.getPrototypeOf(instance);

    // no @contextState used in target class
    if (!prototype[CONTEXT_STATE_ASSIGNMENTS]) return;

    for (let contextStateName of prototype[CONTEXT_STATE_ASSIGNMENTS]) {

      st.addContextChangeHandler(contextStateName, (change: IStateChange) => {

        if (instance.shouldRender!(RenderReason.STATE_CHANGE, change)) {
          instance.doRender!();
        }
      });
    }
  }
}
