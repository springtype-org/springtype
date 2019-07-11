import {Element, Lifecycle, UseElement, ActiveRenderer} from "@springtype/core";
import {TodoService} from "../service/TodoService";
import {ITodoItem} from "../state/ITodoState";
import {AppLayout} from "../element/layout/AppLayout";
import {ActiveRoute} from "@springtype/router";

@Element('example-todo-detail')
@UseElement(AppLayout)
export class TodoDetailsPage extends HTMLElement implements Lifecycle {

    constructor(
        protected todoService: TodoService,
        protected activeRoute: ActiveRoute
    ) {
        super();
    }

    render() {

        const params = this.activeRoute.getParams();

        const todo: ITodoItem = this.todoService.getById(parseInt(params.id, 10)) || {
            id: -1,
            text: 'Invalid id'
        };

        // what is returned, will be attached to this node
        return <app-layout>
            <div slot="children">
                <ul>
                    <li>ID: {todo.id}</li>
                    <li>Text: {todo.text}</li>
                </ul>
            </div>
        </app-layout>;
    }
}