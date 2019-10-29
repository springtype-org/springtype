import { ChangeType } from "../../../core/cd/interface/change-type";

export interface IStateChange {
  type: ChangeType;
  name: string;
  path: string;
  value: any;
  prevValue: any;
}

export type IOnStateChangeHandler = (change: IStateChange) => void;

export interface IOnStateChange {
  onStateChange?(change: IStateChange): void;
}
