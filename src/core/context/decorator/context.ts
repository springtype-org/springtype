import { GlobalCache } from "../../st/interface/i$st";
import { st } from "../../st/st";
import { initContextCache } from "../context";

export const context = (contextName: string): any => {
  initContextCache();

  return (instance: any, propName: string) => {
    // instead of reading and writing from/to the class instance memory,
    // use the context cache instead
    Object.defineProperty(instance, propName, {
      get: () => {
        return st[GlobalCache.CONTEXT][contextName].value;
      },
      set: value => {
        st[GlobalCache.CONTEXT][contextName].value = value;
      },
      configurable: false,
    });
  };
};
