import { st } from "../../core";

const stateAccessHandler = {
	get(target: any, p: string | number | symbol): any {
		// auto-create subsequent objects on access (prevents undefined errors)
		target[p] = target[p] || {};
		return new Proxy(target[p], stateAccessHandler);
	}
};

export class Store {
	static init() {
		if (!st.store) {
			// global state store for the application state as
			// a proxied singleton instance of Store
			st.store = new Proxy(new Store(), stateAccessHandler);
		}
	}
}
Store.init();

export const store = st.store;
