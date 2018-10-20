import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {TodoService} from "../../service/TodoService";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {WebAppLogger} from "../../../../../src/package/log";
import {ITodoItem} from "../../state/ITodoState";

interface TodoProps {
    id: number;
    text: string;
}

@WebComponent({
    tag: 'example-todo-detail',
    props: ['todo'],
})
export class ExampleTodoDetail extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: TodoProps,
        protected todoService: TodoService,
        protected router: Router,
        protected log: WebAppLogger,
    ) {
        super();
    }

    render() {

        const params = this.router.getParams();

        const todo: ITodoItem = this.todoService.getById(parseInt(params.id, 10) ) || {
            id: -1,
            text: 'Invalid id'
        };

        // what is returned, will be attached to this node
        return (
            <div>
                <h1>TODO</h1>
                <ul>
                    <li>ID: { todo.id }</li>
                    <li>Text: { todo.text }</li>
                </ul>
            </div>
        );
    }
}