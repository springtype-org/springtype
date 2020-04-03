import { ChangeType } from "../../cd/interface/change-type";

export interface IContextChange {
  type: ChangeType;
  name: string;
  path: string;
  value: any;
  prevValue: any;
}

export type IOnContextChangeHandler = (change: IContextChange) => void;
