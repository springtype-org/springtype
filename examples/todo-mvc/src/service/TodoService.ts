import {Component} from "@springtype/springtype-incubator-core";
import {Stateful, StatefulLifecycle} from "@springtype/springtype-incubator-state";
import {IRootState} from "../state/IRootState";
import {ITodoItem} from "../state/ITodoState";

@Stateful
@Component
export class TodoService implements StatefulLifecycle {

    constructor(
        public state: IRootState,
    ) {}

    getById(id: number): ITodoItem {

        return this.state.TodoModel.todos
            .filter((todo: ITodoItem) => {
                return todo.id === id;
            })[0];
    }
}