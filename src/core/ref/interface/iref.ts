import { ILifecycle } from "../../../web/component/interface";
import { st } from "../../st";

export type RefFn = (...args: any) => any;
export type Ref = ILifecycle | typeof st.component;

export interface IRefs {
  [name: string]: Ref;
}
