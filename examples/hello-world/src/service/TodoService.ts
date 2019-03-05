import {Component} from "../../../../src/package/di";
import {Store} from "../../../../src/package/state";
import {IRootState} from "../state/IRootState";
import {ITodoItem} from "../state/ITodoState";
import {TodoModel} from "../model/TodoModel";
import {getPhantomId} from "../getPhantomId";
import {Stateful} from "../../../../src/package/state/src/decorators/Stateful";
import {StatefulLifecycle} from "../../../../src/package/state/src/interface/StatefulLifecycle";

@Stateful
@Component
export class TodoService implements StatefulLifecycle<IRootState> {

    constructor(
        public state: IRootState,
        protected store: Store<IRootState>,
        protected todoModel: TodoModel,
    ) {}

    getById(id: number): ITodoItem {

        return this.state.TodoModel.todos
            .filter((todo: ITodoItem) => {
                return todo.id === id;
            })[0];
    }

    addItem() {
        const newItemId = getPhantomId();
        this.todoModel.addTodo({
            done: false,
            id: newItemId,
            text:`${newItemId}. new Item`
        });
    }
}