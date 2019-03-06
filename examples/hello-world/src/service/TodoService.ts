import {Component} from "../../../../src/package/di";
import {IRootState} from "../state/IRootState";
import {ITodoItem} from "../state/ITodoState";
import {TodoModel} from "../model/TodoModel";
import {getPhantomId} from "../function/getPhantomId";
import {Stateful} from "../../../../src/package/state/src/decorators/Stateful";
import {StatefulLifecycle} from "../../../../src/package/state/src/interface/StatefulLifecycle";

@Stateful
@Component
export class TodoService implements StatefulLifecycle {

    constructor(
        public state: IRootState,
        protected todoModel: TodoModel,
    ) {}

    getById(id: number): ITodoItem {

        return TodoModel.selectTodos(this.state)
            .filter((todo: ITodoItem) => {
                return todo.id === id;
            })[0];
    }

    addItem(text: string) {

        const newItemId = getPhantomId();

        this.todoModel.addTodo({
            done: false,
            id: newItemId,
            text
        });
    }
}