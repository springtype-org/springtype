import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html/src/decorator/WebComponent";
import {Todo, TodoService} from "../../service/TodoService";
import {Router} from "../../../../../src/package/html/src/router/Router";

interface TodoState {
    id: number;
    text: string;
}

@WebComponent({
    tag: 'example-todo-detail',
    attributes: ['todo'],
})
export class ExampleTodoDetail extends HTMLElement implements WebComponentLifecycle {

    // all attributes are auto-synced with the state object
    state!: TodoState;

    constructor(
        protected todoService: TodoService,
        protected router: Router
    ) {
        super();
    }

    render() {

        const params = this.router.getParams();

        let todo: Todo;

        if (params.id) {

            todo = this.todoService.getById(parseInt(params.id, 10));

        } else {

            todo = {
                id: -1,
                text: 'Invalid id'
            }
        }

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