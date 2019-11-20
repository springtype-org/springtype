import { st } from "../st";
import { IBusEventHandler } from "./interface/ibus";
import { IBusTarget } from "./interface/ibus-target";
import { IBusObserver } from "./interface/ibus-observer";

export const EVENT_BUS_INIT_NAME = "$st__eventBus";

if (st.bus) {

  st.bus = {

    initEventing: (instance: any) => {
      if (!instance[EVENT_BUS_INIT_NAME]) {
        instance[EVENT_BUS_INIT_NAME] = {
          listeners: []
        }
      }
    },

    publish: <D>(instance: any, eventName: string, data: D) => {
      st.bus.initEventing(instance);

      for (let observer of (instance as IBusTarget).listeners) {
        if (observer.eventName === eventName) {
          observer.fn(data);
        }
      }
    },

    subscribe: <D>(instance: any, eventName: string, fn: IBusEventHandler<D>) => {
      st.bus.initEventing(instance);

      (instance as IBusTarget).listeners.push({
        eventName,
        fn
      } as IBusObserver);
    }
  }
}
