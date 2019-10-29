import { IOnStateChangeHandler } from "../../../web/component/interface/ion-state-change";

export interface IContextCacheEntries {
  [contextName: string]: {
    value: any;
    onChangeHandlers: Array<IOnStateChangeHandler>;
  };
}
