import {Todo, TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html/src/decorator/WebComponent";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {RenderStrategy} from "../../../../../src/package/html";

interface TodoListState {
    todos: Array<Todo>;
}

@WebComponent({
    tag: 'example-todo-list',
    props: ['lala'],
    renderStrategy: RenderStrategy.OnStateChange
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle {

    // all props are auto-synced with the state object
    state!: TodoListState;

    constructor(public lala: number,
                protected todoService: TodoService,
                protected router: Router) {

        super();
    }

    onListItemClick = (evt: Event) => {

        console.log('List item click this.lala?', evt.target);
    };

    init() {

        // TODO: Should be possible in constructor too...
        this.state.todos = this.todoService.getTodos();

        console.log('Mutated state todos', this.state.todos);

        console.log('lala attribute', this.lala);
    }

    render() {

        console.log('render called ExampleTodoList');

        // loop rendering is inherent
        const listItems = this.state.todos.map((todo: Todo) =>
            <li onclick={ this.onListItemClick }>
                <a href={ `/#/todo/${todo.id}` }>{ todo.text }</a>
            </li>
        );

        // what is returned, will be attached to this node
        return (
            <div>
                <h2>TODO's:</h2>
                <ul>{ listItems }</ul>
            </div>
        );
    }
}