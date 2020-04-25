import { DefaultEventDataType } from "./idefault-event-data-type";

export type IMessageEventHandler<DataType = DefaultEventDataType> = (event: DataType) => void;
