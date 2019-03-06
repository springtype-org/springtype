import {TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {ExampleTodoDetail} from "../detail/ExampleTodoDetail";
import {ITodoItem} from "../../state/ITodoState";
import {IRootState} from "../../state/IRootState";
import {TodoModel} from "../../model/TodoModel";
import {Partial} from "../../../../../src/package/lang";
import {ROUTE_TODO_DETIALS} from "../../routes";

interface TodoListProps {
    todos: Array<ITodoItem>;
}

interface TodoListLocalState {
    newTodoItemText: string;
}

@WebComponent({
    tag: 'example-todo-list',

    // automatically called when the state changes
    mapStateToProps: (state: IRootState): Partial<TodoListProps> => ({

        // map only what you want to map (filter/map/reduce)
        // this might trigger a re-render but only if there is a real change
        todos: TodoModel.selectTodos(state)
    })
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: TodoListProps,
        public state: IRootState,
        public localState: TodoListLocalState,
        protected todoService: TodoService,
        protected router: Router,
    ) {
        super();
    }

    onListItemClick = (id: number) => {
        this.router.navigate(ROUTE_TODO_DETIALS, {id});
    };

    onAddItem = () => {

        // TODO: Show dialog to add item
        this.todoService.addItem(this.localState.newTodoItemText);
    };

    onNewTodoTextChange = (evt) => {

        console.log('evt', evt.target.value);

        this.localState.newTodoItemText = evt.target.value;
    };

    render() {

        const listItems = this.props.todos ?
            this.props.todos.map((todo: ITodoItem) =>
                <li onclick={() => {
                    this.onListItemClick(todo.id)
                }} class="todo-item">
                    {todo.text}
                </li>
            ) : [];

        return (
            <div>
                <ul>{listItems}</ul>
                <input id="newTodoText" placeholder="What's TODO next?" onKeyUp={this.onNewTodoTextChange} />
                <a className="waves-effect waves-light btn" onClick={this.onAddItem}>Add</a>
            </div>
        );
    }
}