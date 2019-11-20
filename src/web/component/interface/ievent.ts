export interface IEvent<D> {
  detail?: D;
}

export type IEventListener<D> = (evt: IEvent<D> & Event) => void | boolean;
