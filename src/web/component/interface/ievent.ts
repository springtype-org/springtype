export interface IEvent<D> {

  // it is optional, because one can also disptach native DOM events as a relay
  // those events don't have any detail member property
  detail?: D;
}

export type IEventListener<D> = (evt: IEvent<D> & Event) => void | boolean;
