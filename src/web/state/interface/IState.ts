import { StatePersistenceMode } from "../enum/StatePersistenceMode";
import { StateMutationMode } from "../enum/StateMutationMode";
import { IStateChangeSubscription } from "./IStateChangeSubscription";

export interface IState {
    persistenceMode: StatePersistenceMode;
    mutationMode: StateMutationMode;
    subscribe: (path: string, subscriberFunction: Function) => IStateChangeSubscription;
    unsubscribe: (path: string, subscriberFunction: Function) => IState;
}