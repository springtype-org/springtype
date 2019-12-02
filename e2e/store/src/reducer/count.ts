import { AppState, initialState } from "../state";
import { IAction } from "../../../../src/core/store/interface/iaction";
import { actions } from "../actions";

export const countReducer = (state: AppState = initialState, action: IAction) => {
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
