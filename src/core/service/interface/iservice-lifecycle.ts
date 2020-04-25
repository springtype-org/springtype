import { IContextChange } from "../../context/interface/icontext-change-handler";

export interface IServiceLifecycle {

  // if an @store is mounted, this method is called on store change
  onStoreChange?(propName: string, value: any): void;

  // if a @context changes, this method is called and delegates
  // calls to @onStateChange decorated methods
  onContextChange?(change: IContextChange): void;

  // receive and filter messages; delegates to @onMessage methods
  onMessage?(topicName: string, value: any): void;
}
