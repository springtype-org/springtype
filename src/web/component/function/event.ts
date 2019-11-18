import { st } from "../../../core";

export function event<D>(instance: Node, eventName: string, init?: CustomEventInit<any> & { detail: D }) {
  instance.dispatchEvent(new CustomEvent(eventName, init));
}

if (!st.event) {
  st.event = event;
}
