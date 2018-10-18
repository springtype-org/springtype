import {Reducer} from "../../../../src/package/state/src/decorators/Reducer";
import {Effect} from "../../../../src/package/state/src/decorators/Effect";
import {IStatefulModel, StatefulModel} from "../../../../src/package/state/src/decorators/StatefulModel";

export interface ITodoItem {
    id: number;
    text: string;
    done: boolean;
}

export interface ITodoState {
    todos: Array<ITodoItem>
}

@StatefulModel
export class TodoModel implements IStatefulModel<ITodoState> {

    constructor(public state: ITodoState) {
    }

    onInitialState(): ITodoState {

        console.log('onInitialState');

        return {
            todos: []
        };
    }

    @Reducer
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        console.log('reducer onAddTodo called', state);

        state.todos.push(todoItem);

        return state;
    }

    @Effect
    async addTodo(todoItem: ITodoItem) {

        console.log('effect addTodo called', todoItem);

        this.onAddTodo(this.state, todoItem);
    }
}