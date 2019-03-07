import {Component} from "../../../../src/package/di";
import {IRootState} from "../state/IRootState";
import {ITodoItem} from "../state/ITodoState";
import {Stateful} from "../../../../src/package/state/src/decorators/Stateful";
import {StatefulLifecycle} from "../../../../src/package/state/src/interface/StatefulLifecycle";

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