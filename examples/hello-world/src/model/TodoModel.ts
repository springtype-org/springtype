import {Reducer} from "../../../../src/package/state";
import {Effect} from "../../../../src/package/state";
import {Model} from "../../../../src/package/state";
import {Store} from "../../../../src/package/state";

export interface ITodoItem {
    id: number;
    text: string;
    done: boolean;
}

export interface ITodoModelState {
    todos: Array<ITodoItem>
}

export interface ITodoModelDispatch {
    TodoModel: {
        onAddTodo(todoItem: ITodoItem): ITodoModelState;
    }
}

// TODO: Must implement interface {initialState, dispatch}!
@Model
export class TodoModel {

    constructor(
        public initialState: ITodoModelState,
        public dispatch: ITodoModelDispatch,
        public store: Store,
    ) {

        // set initial initialState
        initialState.todos = [];
    }

    @Reducer
    onAddTodo(state: ITodoModelState, todoItem: ITodoItem): ITodoModelState {

        console.log('reducer onAddTodo called', state);

        state.todos = [
            ...state.todos,
            todoItem
        ];
        return state;
    }

    @Effect
    async addTodo(todoItem: ITodoItem) {

        console.log('effect addTodo called', todoItem, this.store);

        this.dispatch.TodoModel.onAddTodo(todoItem);
    }
}