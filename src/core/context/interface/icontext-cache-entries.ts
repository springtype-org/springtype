import { IOnStateChangeHandler } from "../../../web/customelement/interface/ion-state-change";

export interface IContextCacheEntries {
  [contextName: string]: {
    value: any;
    onChangeHandlers: Array<IOnStateChangeHandler>;
  };
}
