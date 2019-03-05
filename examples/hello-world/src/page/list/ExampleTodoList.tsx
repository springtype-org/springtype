import {TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {ExampleTodoDetail} from "../detail/ExampleTodoDetail";
import {ITodoItem} from "../../state/ITodoState";
import {StoreConnectedLifecycle} from "../../../../../src/package/state/src/interface/StoreConnectedLifecycle";
import {IRootState} from "../../state/IRootState";
import {Connect} from "../../../../../src/package/state/src/decorators/Connect";

interface TodoListProps {
    todos: Array<ITodoItem>;
}

@WebComponent({
    tag: 'example-todo-list',
    storeConnected: true
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle, StoreConnectedLifecycle<IRootState> {

    constructor(
        public props: TodoListProps,
        protected todoService: TodoService,
        protected router: Router,
    ) {
        super();
    }

    onStoreStateChange(state: IRootState) {
        console.log('on store state change!', state);

    }

    init = () => {
        // TODO: @CurrentState decorator
        this.props.todos = this.todoService.getTodos();
    };

    onListItemClick = (id: number) => {
        this.router.navigate(ExampleTodoDetail, {id});
    };

    onAddItem = () => {

        this.todoService.addItem();

        // FIXME: Effect und re-sync
        this.props.todos = this.todoService.getTodos();
    };

    render() {

        const listItems = this.props.todos.map((todo: ITodoItem) =>
            <li onclick={() => {
                this.onListItemClick(todo.id)
            }} class="todo-item">
                {todo.text}
            </li>
        );

        return (
            <div>
                <ul>{listItems}</ul>
                <a className="waves-effect waves-light btn" onclick={this.onAddItem}>Add</a>
            </div>
        );
    }
}