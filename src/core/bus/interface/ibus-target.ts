import { IBusObserver } from "./ibus-observer";
export interface IBusTarget {
  listeners: Array<IBusObserver>;
}
