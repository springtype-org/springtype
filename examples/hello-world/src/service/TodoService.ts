import {Component} from "../../../../src/package/di";
import {Store} from "../../../../src/package/state";
import {IRootState} from "../state/IRootState";
import {ITodoItem} from "../state/ITodoState";
import {TodoModel} from "../model/TodoModel";
import {getPhantomId} from "../getPhantomId";

@Component
export class TodoService {

    constructor(
        protected store: Store<IRootState>,
        protected todoModel: TodoModel
    ) {}

    // TODO: @CurrentState decorator
    get state(): IRootState {
        return this.store.getState();
    }

    getTodos(): Array<ITodoItem> {
        return this.state.TodoModel.todos;
    }

    getById(id: number): ITodoItem {

        return this.state.TodoModel.todos
            .filter((todo: ITodoItem) => {
                return todo.id === id;
            })[0];
    }

    addItem() {
        const newItemId =getPhantomId();
        this.todoModel.addTodo({
            done: false,
            id: newItemId,
            text:`${newItemId}. new Item`
        });
    }
}