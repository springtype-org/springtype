import { st } from "../st";
import { IMessageTarget } from "./interface/imessage-target";
import { IMessageObserver } from "./interface/imessage-observer";
import { IMessageEventHandler } from "./interface/imessage-event-handler";

export const BUS_INIT_NAME = "$st__bus";
export const BUS_TOPIC_WILDCARD = '*';

// for st.enable(bus, ...)
export const bus = null;

if (!st.bus) {

  st.bus = {

    init: (instance: any = st) => {
      if (!instance[BUS_INIT_NAME]) {
        instance[BUS_INIT_NAME] = {
          listeners: []
        }
      }
    },

    sendMessage: <D>(topic: string, data: D, instance: any = st) => {
      st.bus.init(instance);

      for (let observer of (instance as IMessageTarget)[BUS_INIT_NAME].listeners) {
        if (observer && (observer.topic === topic || observer.topic === BUS_TOPIC_WILDCARD)) {
          observer.fn(data, topic);
        }
      }
    },

    onMessage: <D>(topic: string, fn: IMessageEventHandler<D>, instance: any = st) => {
      st.bus.init(instance);

      (instance as IMessageTarget)[BUS_INIT_NAME].listeners.push({
        topic,
        fn
      } as IMessageObserver);
    },

    onMessageUnsubscribe: <D>(topic: string, fn: IMessageEventHandler<D>, instance: any = st) => {

      if (!(instance as IMessageTarget)[BUS_INIT_NAME]) return;

      for (let i = 0; i < (instance as IMessageTarget)[BUS_INIT_NAME].listeners.length; i++) {

        const observer = (instance as IMessageTarget)[BUS_INIT_NAME].listeners[i];

        if (fn && fn === observer && (observer.topic === topic || topic === BUS_TOPIC_WILDCARD)) {
          delete (instance as IMessageTarget)[BUS_INIT_NAME].listeners[i];
        }
      }
    }
  }

  st.sendMessage = st.bus.sendMessage;
  st.onMessage = st.bus.onMessage;
  st.onMessageUnsubscribe = st.bus.onMessageUnsubscribe;

} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module event-bus is loaded twice. Check for duplicate famework import!');
  }
}
