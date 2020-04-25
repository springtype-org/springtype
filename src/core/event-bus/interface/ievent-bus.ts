import { DefaultEventDataType } from "./idefault-event-data-type";
import { ISendMessageFn } from "./isend-message-fn";
import { IOnMessageFn } from "./ion-message-fn";

export interface IEventBus<DataType = DefaultEventDataType> {
  init(instance?: any): void;
  sendMessage: ISendMessageFn<DataType>;
  onMessage: IOnMessageFn<DataType>;
  // same interface as subscribe, reverse logic
  onMessageUnsubscribe: IOnMessageFn<DataType>;
}
