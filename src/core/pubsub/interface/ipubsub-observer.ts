export interface IPubSubObserver {
  topic: string;
  fn: Function;
}
