import {ActiveRoute, Element, WebComponentLifecycle} from "../../../../src/package/core/index";
import {TodoService} from "../service/TodoService";
import {ITodoItem} from "../state/ITodoState";
import {AppLayout} from "../component/layout/AppLayout";
import {UseElement} from "../../../../src/package/core";

@Element('example-todo-detail')
@UseElement(AppLayout)
export class TodoDetailsPage extends HTMLElement implements WebComponentLifecycle {

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