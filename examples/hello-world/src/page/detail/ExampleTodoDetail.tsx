import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {TodoService} from "../../service/TodoService";
import {Router} from "../../../../../src/package/html/src/router/Router";
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

    init = () => {
    };

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

    init(): void {
    }
}