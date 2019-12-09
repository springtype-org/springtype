import { createStore, compose, applyMiddleware } from "redux";
import { Action } from "../../../src/core/redux/interface/actions";
import { Store } from "../../../src/core/redux/interface/store";

export interface AppState {
  count: number;
}

export interface AppAction extends Action {
  type: string;
  meta?: any;
  data?: any;
}

// initial redux store state
const initialState: AppState = { count: 0 };

// app redux store actions
export const actions = {
  increment: { type: "INCREMENT" },
  decrement: { type: "DECREMENT" },
};

// example count reducer
const countReducer = (state: AppState = initialState, action: AppAction) => {
  switch (action.type) {
    case actions.increment.type:
      return {
        count: state.count + 1,
      };

    case actions.decrement.type:
      return {
        count: state.count - 1,
      };

    default:
      return state;
  }
};

// enable chrome developer tools for redux
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create redux store with initial state and reducer (use compose for many reducers)
export const appStore: Store<AppState, AppAction> = createStore(countReducer, initialState, composeEnhancers(
  applyMiddleware()
));
