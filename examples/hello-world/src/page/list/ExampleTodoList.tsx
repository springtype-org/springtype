import {TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {ExampleTodoDetail} from "../detail/ExampleTodoDetail";
import {ITodoItem} from "../../state/ITodoState";

interface TodoListProps {
    todos: Array<ITodoItem>;
}

@WebComponent({
    tag: 'example-todo-list'
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: TodoListProps,
        protected todoService: TodoService,
        protected router: Router,
    ) {

        super();

        // TODO: @CurrentState decorator
        this.props.todos = this.todoService.getTodos();
    }

    onListItemClick = (id: number) => {
        this.router.navigate(ExampleTodoDetail, { id });
    };

    onAddItem = () => {
        this.todoService.addItem();
    };

    render() {

        const listItems = this.props.todos.map((todo: ITodoItem) =>
            <li onclick={ () => { this.onListItemClick(todo.id) } } class="todo-item">
                { todo.text }
            </li>
        );

        return (
            <div>
                <h2>TODO's:</h2>
                <ul>{ listItems }</ul>

                <button onclick={ this.onAddItem }>Add</button>
            </div>
        );
    }
}