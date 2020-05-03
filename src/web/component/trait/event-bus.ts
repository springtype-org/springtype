import { st } from "../../../core";
import { bus, BUS_TOPIC_WILDCARD } from "../../../core/event-bus";

export class EventBusTrait {

  static enableFor(instance: any) {

    instance._messageObserver = (function (value: any, topic?: string) {
      instance.onMessage.call(instance, topic, value);
    }).bind(instance);

    st.onMessage(BUS_TOPIC_WILDCARD, instance._messageObserver);
  }

  static disableFor(instance: any) {
    st.onMessageUnsubscribe(BUS_TOPIC_WILDCARD, instance._messageObserver, instance);
  }
}

// import publish/subscribe
st.enable(bus);
