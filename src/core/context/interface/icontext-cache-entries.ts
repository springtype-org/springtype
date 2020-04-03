import { IOnContextChangeHandler } from "./icontext-change-handler";

export interface IContextCacheEntries {
  [contextName: string]: {
    value: any;
    onChangeHandlers: Array<IOnContextChangeHandler>;
  };
}
