import { st } from "../../../core";
import { pubsub } from "../../../core/pubsub";

export class MessageTrait {

  static enableFor(instance: any) {

    instance._messageObserver = (function(value: any, topic?: string) {

      if (instance.INTERNAL && instance.INTERNAL.isConnected) {
        console.log('component is connected. call onMessage')
        instance.onMessage.call(instance, topic, value);
      }

    }).bind(instance);

    st.subscribe('*', instance._messageObserver);
  }

  static disableFor(instance: any) {
    st.unsubscribe('*', instance._messageObserver, instance);
  }
}

// import publish/subscribe
st.enable(pubsub);
