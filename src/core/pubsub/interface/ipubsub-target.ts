import { IPubSubObserver } from "./ipubsub-observer";
import { PUBSUB_INIT_NAME } from "../pubsub";

export interface IPubSubTarget {
  listeners: Array<IPubSubObserver>;
  [PUBSUB_INIT_NAME]: any;
}
