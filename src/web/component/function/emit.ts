export function emit<D>(instance: Node, eventName: string, init?: CustomEventInit<any> & { detail: D }) {
  instance.dispatchEvent(new CustomEvent(eventName, init));
}
