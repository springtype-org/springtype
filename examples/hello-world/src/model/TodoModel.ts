import {StateReducer} from "../../../../src/package/state";
import {StateEffect} from "../../../../src/package/state";
import {StateModel} from "../../../../src/package/state";
import {IStateModel} from "../../../../src/package/state/src/IStateModel";
import {ITodoItem, ITodoState} from "../state/ITodoState";

export interface ITodoModelDispatch {
    TodoModel: {
        onAddTodo(todoItem: ITodoItem): ITodoState;
    }
}

@StateModel
export class TodoModel implements IStateModel {

    constructor(
        public initialState: ITodoState,
        public dispatch: ITodoModelDispatch,
    ) {

        // set initial initialState
        initialState.todos = [{
            done: false,
            id: 1,
            text: 'Bar'
        }, {
            done: false,
            id: 3,
            text: 'Toms'
        }];
    }

    @StateReducer
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        state.todos = [
            ...state.todos,
            todoItem
        ];
        return state;
    }

    @StateEffect
    async addTodo(todoItem: ITodoItem) {
        this.dispatch.TodoModel.onAddTodo(todoItem);
    }
}