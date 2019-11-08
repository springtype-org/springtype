import { st } from "../../st";
import { GlobalCache } from "../../st/interface/i$st";
import { CONTEXT_ASSIGNMENTS } from "../decorator/context";
export class ContextTrait {
  static enableFor(instance: any) {

    const prototype = Object.getPrototypeOf(instance);

    // no @context used in target class
    if (!prototype[CONTEXT_ASSIGNMENTS]) return;

    for (let contextPropAssignment of prototype[CONTEXT_ASSIGNMENTS]) {
      // instead of reading and writing from/to the class instance memory,
      // use the context cache instead
      Object.defineProperty(prototype, contextPropAssignment.propName, {
        get: () => {
          return st[GlobalCache.CONTEXT][contextPropAssignment.contextName].value;
        },
        set: value => {
          st[GlobalCache.CONTEXT][contextPropAssignment.contextName].value = value;
        },
        configurable: true,
      });
    }
  }
}
