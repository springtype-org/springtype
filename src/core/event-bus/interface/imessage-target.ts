import { IMessageObserver } from "./imessage-observer";
import { BUS_INIT_NAME } from "../event-bus";

export interface IMessageTarget {
  listeners: Array<IMessageObserver>;
  [BUS_INIT_NAME]: any;
}
