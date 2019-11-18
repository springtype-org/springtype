export interface IAction<D = {}, M = {}> { type: string; data?: D; meta?: M; }
export type MiddlewareFunction<S> = (state: S) => S;
export type Reducer<S, A = IAction> = (currentState: S, action: A) => S;
export const INIT_ACTION = "@@store/INIT";

export const createStore = <S = {}>(reducer: Reducer<S>, preloadedState?: S, enhancer?: MiddlewareFunction<S>) => {
  let listeners: Array<Function> = [];
  let currentState = reducer(preloadedState!, { type: INIT_ACTION });

  return {
    getState: () => currentState,
    dispatch: (action: IAction) => {
      if (enhancer) {
        currentState = enhancer(reducer(currentState, action));
      } else {
        currentState = reducer(currentState, action);
      }
      for (let listener of listeners) {
        listener();
      }
    },
    subscribe: (listener: Function) => {
      listeners.push(listener);

      // return the unsubscribe function
      return () => {
        // TODO: unshift instead
        listeners = listeners.filter(l => l !== listener);
      };
    },
  };
};

export const applyMiddleware = <S>(...middlewares: Array<MiddlewareFunction<S>>) => {
  return (state: S) => {
    for (let middleware of middlewares) {
      state = middleware(state);
    }
    return state;
  };
};


/*
/// --- USAGE

interface State {
  count: number;
}

// Redux architecture pieces
const initialState: State = { count: 0 };

const actions = {
  increment: { type: "INCREMENT" },
  decrement: { type: "DECREMENT" },
};

const countReducer = (state: State = initialState, action: IAction) => {
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

const store = createStore(countReducer);

// DOM elements
const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");

// Wire click events to actions
incrementButton.addEventListener("click", () => {
  store.dispatch(actions.increment);
});

decrementButton.addEventListener("click", () => {
  store.dispatch(actions.decrement);
});

// Initialize UI display
const counterDisplay = document.querySelector("h1");
counterDisplay.innerHTML = parseInt(initialState.count);

// Update UI when an action fires
store.subscribe(() => {
  const state = store.getState();

  console.log("count: ", parseInt(state.count));
});
*/
