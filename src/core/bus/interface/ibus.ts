export type DefaultEventDataType = {};

export type IBusEventHandler<DataType = DefaultEventDataType> = (event: DataType) => void;

export type publishFn = <D>(instance: any, eventName: string, data: D) => void;
export type subscribeFn = <D>(instance: any, name: string, fn: IBusEventHandler<D>) => void;

export interface IBus<DataType = DefaultEventDataType> {
  initEventing(instance: any): void;
  publish(instance: any, name: string, data: DataType): void;
  subscribe(instance: any, name: string, fn: IBusEventHandler<DataType>): void;
}
