import {Todo, TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html/src/decorator/WebComponent";
import {Component} from "../../../../../src/package/di";
import {Router} from "../../../../../src/package/html/src/router/Router";

interface TodoListState {
    todos: Array<Todo>;
}

@WebComponent({
    tag: 'example-todo-list'
})
@Component
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle {

    // all props are auto-synced with the state object
    state!: TodoListState;

    constructor(protected todoService: TodoService,
                protected router: Router) {

        super();
    }

    onListItemClick = (evt: Event) => {

        console.log('List item click', evt.target);
    };

    render() {

        this.state.todos = this.todoService.getTodos();

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