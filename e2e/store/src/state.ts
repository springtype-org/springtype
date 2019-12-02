import { createStore, store } from "../../../src/core/store/store";
import { countReducer } from "./reducer/count";
import { st } from "../../../src/core";

st.enable(store);

export interface AppState {
  count: number;
}

// Redux architecture pieces
export const initialState: AppState = { count: 0 };

// TODO: compose(reducers), enhancerEnhancer()
export const appStore = createStore<AppState>(countReducer, initialState);

window.appStore = appStore;
