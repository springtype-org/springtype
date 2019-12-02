import { MiddlewareFunction } from "./interface/imiddleware-function";
import { IAction } from "./interface/iaction";
import { Reducer } from "./interface/ireducer";

export const INIT_ACTION = "@@store/INIT";

// for st.enable(store, ...)
export let store: any = null;

// TODO: check
export const applyMiddleware = <S = {}>(...middlewares: Array<MiddlewareFunction<S>>) => {
  return (state: S) => {
    for (let middleware of middlewares) {
      state = middleware(state);
    }
    return state;
  };
};

export interface IReducerMap<S> {
  [key: string]: Reducer<S>
}

export const combineReducers = <S = {}>(reducerMap: IReducerMap<S>) => {
  return (state: S, action: IAction) => {
    for (let key in reducerMap) {
      (state as any)[key]= reducerMap[key]((state as any)[key], action);
    }
    return state;
  };
}

export const createStore = <S = {}>(reducer: Reducer<S>, preloadedState?: S, enhancer?: MiddlewareFunction<S>) => {
  let listeners: Array<Function> = [];
  let currentState = reducer(preloadedState!, { type: INIT_ACTION });
  // @ts-ignore
  let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : undefined;

  if (devTools) {
    // TODO: change impl. for redux / composeEnhancer
    devTools.connect();
  }

  return (store = {
    devTools,
    getState: () => currentState,
    dispatch: (action: IAction) => {

      if (enhancer) {
        // TODO: check
        currentState = enhancer(reducer(currentState, action));
      } else {
        currentState = reducer(currentState, action);
      }

      devTools.send(action.type, currentState);

      for (let listener of listeners) {
        listener();
      }
    },
    subscribe: (listener: Function) => {
      listeners.push(listener);

      // return the unsubscribe function
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      };
    },
  });
};
