import { createStore, compose, applyMiddleware } from "redux";
import { countReducer } from "./reducer/count";

export interface AppState {
  count: number;
}

// Redux architecture pieces
export const initialState: AppState = { count: 0 };

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO: compose(reducers), enhancerEnhancer()
export const appStore = createStore(countReducer, initialState, composeEnhancers(
  applyMiddleware()
));

