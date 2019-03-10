import {Router, WebComponent, WebComponentLifecycle} from "../../../../src/package/core/index";
import {TodoService} from "../service/TodoService";
import {ITodoItem} from "../state/ITodoState";
import {AppLayout} from "../component/layout/AppLayout";

@WebComponent({
    tag: 'example-todo-detail',
    components: [
        AppLayout
    ]
})
export class TodoDetailsPage extends HTMLElement implements WebComponentLifecycle {

    constructor(
        protected todoService: TodoService,
        protected router: Router
    ) {
        super();
    }

    render() {

        const params = this.router.getParams();

        const todo: ITodoItem = this.todoService.getById(parseInt(params.id, 10)) || {
            id: -1,
            text: 'Invalid id'
        };

        // what is returned, will be attached to this node
        return (

            <app-layout props={{
                children: <st-fragment>
                    <ul>
                        <li>ID: {todo.id}</li>
                        <li>Text: {todo.text}</li>
                    </ul>
                </st-fragment>
            }} />
        );
    }
}