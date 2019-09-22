import { st } from "../../core";
import { StateMutationMode } from "./enum/StateMutationMode";
import { StatePersistenceMode } from "./enum/StatePersistenceMode";
import { IState } from "./interface/IState";
import { IStateChangeSubscription } from "./interface/IStateChangeSubscription";
import { StateChangeSubscription } from "./StateChangeSubscription";
import { Store } from "./Store";

interface Subscriptions {
	[path: string]: Array<Function>;
}

// https://dev.to/selbekk/redux-in-27-lines-2i92

export class State implements IState {
	persistenceMode = StatePersistenceMode.MEMORY;
	mutationMode = StateMutationMode.MUTABLE;

	protected subscriptions: Subscriptions = {};

	static init() {
		if (!st.state) {
			// global state store for the application state as
			// a proxied singleton instance of AppState
			st.state = new State();
		}
	}

	getStore(): Store {
		return st.store;
	}

	subscribe = (
		path: string,
		subscriberFunction: Function
	): IStateChangeSubscription => {
		this.initSubscription(path);

		this.subscriptions[path].push(subscriberFunction);

		return new StateChangeSubscription(path, subscriberFunction);
	};

	unsubscribe = (path: string, subscriberFunction: Function): IState => {
		this.initSubscription(path);

		// find index
		const index = this.subscriptions[path].findIndex(
			(subscriberFunctionCandidate: Function) =>
				subscriberFunctionCandidate === subscriberFunction
		);

		// remove subscriber by splice/index
		this.subscriptions[path].splice(index, 1);

		return this;
	};

	protected initSubscription(path: string): void {
		if (!this.subscriptions[path]) {
			this.subscriptions[path] = [];
		}
	}
}

State.init();

export const state = st.state;
export const subscribe = st.state.subscribe;
