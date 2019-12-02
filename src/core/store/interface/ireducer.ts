import { IAction } from "./iaction";

export type Reducer<S, A = IAction> = (currentState: S, action: A) => S;
