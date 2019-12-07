import { AppState, initialState } from "../state";
import { actions } from "../actions";

export const countReducer = (state: AppState = initialState, action: any) => {
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
