import {StateReducer} from "../../../../src/package/state";
import {StateEffect} from "../../../../src/package/state";
import {StateModel} from "../../../../src/package/state";
import {IStateModel} from "../../../../src/package/state/src/IStateModel";
import {ITodoItem, ITodoState} from "../state/ITodoState";
import {getPhantomId} from "../getPhantomId";

export interface ITodoModelEffects {
    TodoModel: {
        onAddTodo(todoItem: ITodoItem): ITodoState;
    }
}

@StateModel
export class TodoModel implements IStateModel {

    constructor(
        public initialState: ITodoState,
        public effects: ITodoModelEffects,
    ) {

        // set initial initialState
        initialState.todos = [{
            done: false,
            id: getPhantomId(),
            text: 'Bar'
        }, {
            done: false,
            id: getPhantomId(),
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
        this.effects.TodoModel.onAddTodo(todoItem);
    }
}