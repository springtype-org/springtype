export interface IEvent<D> {

  // it is optional, because one can also disptach native DOM events as a relay
  // those events don't have any detail member property
  detail?: D;
}

// N defines the native DOM event type. It might by specified when relaying native DOM events
export type IEventListener<D, N=Event> = (evt: IEvent<D> & N) => void | boolean;
