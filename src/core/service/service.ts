import { ContextTrait } from "../context";
import { StoreTrait } from "../../web/component/trait/store";
import { EventBusTrait } from "../../web/component/trait/event-bus";
import { st } from "../st";
import { IContextChange } from "../context/interface/icontext-change-handler";
import { IServiceLifecycle } from "./interface/iservice-lifecycle";
import { callOnContextChange } from "../context/function/call-on-context-change";
import { callOnMessage } from "../event-bus/function/call-on-message";

export class Service implements IServiceLifecycle {

  constructor() {

    // @context impl.
    ContextTrait.enableFor(this);

    // @store
    StoreTrait.enableFor(this);

    // .onMessage / .sendMessage()
    EventBusTrait.enableFor(this);
  }

  onContextChange(change: IContextChange) {
    callOnContextChange(change, this);
  }

  onMessage(topicName: string, value: any) {
    callOnMessage(topicName, value, this);
  }
}

if (!st.service) {
  st.service = Service;
} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module service is loaded twice. Check for duplicate famework import!');
  }
}
