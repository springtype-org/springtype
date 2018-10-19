import {Reducer} from "../../../../src/package/state";
import {Effect} from "../../../../src/package/state";
import {Model} from "../../../../src/package/state";
import {Store} from "../../../../src/package/state/src/Store";

export interface ITodoItem {
    id: number;
    text: string;
    done: boolean;
}

export interface ITodoState {
    todos: Array<ITodoItem>
}

export interface ITodoModelDispatch {
    TodoModel: {
        onAddTodo(todoItem: ITodoItem): ITodoState;
    }
}

@Model
export class TodoModel {

    constructor(
        public state: ITodoState,
        public dispatch: ITodoModelDispatch,
        public store: Store,
    ) {

        // set initial state
        state.todos = [];
    }

    @Reducer
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

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