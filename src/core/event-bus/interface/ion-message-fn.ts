import { IMessageEventHandler } from "./imessage-event-handler";

export type IOnMessageFn<DataType> = (name: string, fn: IMessageEventHandler<DataType>, instance?: any) => void;
