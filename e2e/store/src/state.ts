import { createStore, store, compose, applyMiddleware } from "../../../src/core/store/store";
import { countReducer } from "./reducer/count";
import { st } from "../../../src/core";

st.enable(store);

export interface AppState {
  count: number;
}

// Redux architecture pieces
export const initialState: AppState = { count: 0 };

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO: compose(reducers), enhancerEnhancer()
export const appStore = createStore<AppState>(countReducer, initialState, composeEnhancers(
  applyMiddleware()
));

window.appStore = appStore;
