import { DefaultEventDataType } from "./idefault-event-data-type";

export type IPubSubEventHandler<DataType = DefaultEventDataType> = (event: DataType) => void;
