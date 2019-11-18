export type DefaultEventDataType = {};

export type IBusEventHandler<DataType = DefaultEventDataType> = (event: DataType) => void;

export interface IBus<DataType = DefaultEventDataType> {
  publish(instance: any, name: string, data: DataType): void;
  subscribe(instance: any, name: string, fn: IBusEventHandler<DataType>): void;
}
