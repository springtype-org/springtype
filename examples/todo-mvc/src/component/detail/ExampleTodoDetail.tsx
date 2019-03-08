import {Router, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import {TodoService} from "../../service/TodoService";
import {ITodoItem} from "../../state/ITodoState";

@WebComponent({
    tag: 'example-todo-detail'
})
export class ExampleTodoDetail extends HTMLElement implements WebComponentLifecycle {

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
            <ul>
                <li>ID: {todo.id}</li>
                <li>Text: {todo.text}</li>
            </ul>
        );
    }
}