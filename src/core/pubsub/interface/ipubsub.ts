import { DefaultEventDataType } from "./idefault-event-data-type";
import { IPublish } from "./ipublish";
import { ISubscribe } from "./isubscribe";

export interface IPubSub<DataType = DefaultEventDataType> {
  initEventing(instance?: any): void;
  publish: IPublish<DataType>;
  subscribe: ISubscribe<DataType>;
  // same interface as subscribe, reverse logic
  unsubscribe: ISubscribe<DataType>;
}
