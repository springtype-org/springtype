import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {Todo, TodoService} from "../../service/TodoService";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {WebAppLogger} from "../../../../../src/package/log";

interface TodoProps {
    id: number;
    text: string;
}

class X<Y> {

   static of<Y>(value: Y): X<Y> {
        return new X<Y>();
    }

    flatMap<Z>(fn: () => Z): X<Z> {
        return X.of(fn());
    }
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

        this.log.log('Rendering...');

        const params = this.router.getParams();

        const todo: Todo = this.todoService.getById(parseInt(params.id, 10) ) || {
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