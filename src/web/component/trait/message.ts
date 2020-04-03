import { st } from "../../../core";
import { pubsub, PUBSUB_TOPIC_WILDCARD } from "../../../core/pubsub";

export class MessageTrait {

  static enableFor(instance: any) {

    instance._messageObserver = (function(value: any, topic?: string) {

      if (instance.INTERNAL && instance.INTERNAL.isConnected) {
        instance.onMessage.call(instance, topic, value);
      }

    }).bind(instance);

    st.subscribe(PUBSUB_TOPIC_WILDCARD, instance._messageObserver);
  }

  static disableFor(instance: any) {
    st.unsubscribe(PUBSUB_TOPIC_WILDCARD, instance._messageObserver, instance);
  }
}

// import publish/subscribe
st.enable(pubsub);
