import { IPubSubEventHandler } from "./ipubsub-event-handler";

export type ISubscribe<DataType> = (name: string, fn: IPubSubEventHandler<DataType>, instance?: any) => void;
