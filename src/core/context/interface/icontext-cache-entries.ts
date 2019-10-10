import { IOnStateChangeHandler } from "../../state/interface";

export interface IContextCacheEntries {
  [contextName: string]: {
    value: any;
    onChangeHandlers: Array<IOnStateChangeHandler>;
  };
}
