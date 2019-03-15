import {ActiveRoute, WebComponent, WebComponentLifecycle} from "../../../../src/package/core/index";
import {TodoService} from "../service/TodoService";
import {ITodoItem} from "../state/ITodoState";
import {AppLayout} from "../component/layout/AppLayout";
import {UseComponent} from "../../../../src/package/core";

@WebComponent('example-todo-detail')
@UseComponent(AppLayout)
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
        return (

            <app-layout items={
                <st-fragment>
                    <ul>
                        <li>ID: {todo.id}</li>
                        <li>Text: {todo.text}</li>
                    </ul>
                </st-fragment>
            } />
        );
    }
}