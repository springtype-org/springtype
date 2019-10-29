export interface IEvent<D> {
  detail: D;
}

export type IEventListener<D, E> = (evt: IEvent<D> & E) => void | boolean;
