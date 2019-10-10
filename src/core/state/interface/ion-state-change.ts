export enum StateChangeType {
  REFERENCE = "REFERENCE",
  DEEP = "DEEP",
}

export interface IStateChange {
  type: StateChangeType;
  name: string;
  path: string;
  value: any;
  prevValue: any;
}

export type IOnStateChangeHandler = (change: IStateChange) => void;

export interface IOnStateChange {
  onStateChange?(change: IStateChange): void;
}
