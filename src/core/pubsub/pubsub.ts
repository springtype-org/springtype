import { st } from "../st";
import { IPubSubTarget } from "./interface/ipubsub-target";
import { IPubSubObserver } from "./interface/ipubsub-observer";
import { IPubSubEventHandler } from "./interface/ipubsub-event-handler";

export const PUBSUB_INIT_NAME = "$st__pubSub";

// for st.enable(pubsub, ...)
export const pubsub = null;

if (!st.pubsub) {

  st.pubsub = {

    initEventing: (instance: any = st) => {
      if (!instance[PUBSUB_INIT_NAME]) {
        instance[PUBSUB_INIT_NAME] = {
          listeners: []
        }
      }
    },

    publish: <D>(topic: string, data: D, instance: any = st) => {
      st.pubsub.initEventing(instance);

      for (let observer of (instance as IPubSubTarget)[PUBSUB_INIT_NAME].listeners) {
        if (observer.topic === topic) {
          observer.fn(data);
        }
      }
    },

    subscribe: <D>(topic: string, fn: IPubSubEventHandler<D>, instance: any = st) => {
      st.pubsub.initEventing(instance);

      (instance as IPubSubTarget)[PUBSUB_INIT_NAME].listeners.push({
        topic,
        fn
      } as IPubSubObserver);
    }
  }

  st.publish = st.pubsub.publish;
  st.subscribe = st.pubsub.subscribe;

} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module pubsub is loaded twice. Check for duplicate famework import!');
  }
}
