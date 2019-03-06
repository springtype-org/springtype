import {TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {ExampleTodoDetail} from "../detail/ExampleTodoDetail";
import {ITodoItem} from "../../state/ITodoState";
import {StatefulLifecycle} from "../../../../../src/package/state/src/interface/StatefulLifecycle";
import {IRootState} from "../../state/IRootState";
import {TodoModel} from "../../model/TodoModel";

interface TodoListProps {
    todos: Array<ITodoItem>;
}

@WebComponent({
    tag: 'example-todo-list',

    // automatically called when the state changes
    mapStateToProps: (state: IRootState) => ({

        // map only what you want to map (filter/map/reduce)
        // this might trigger a re-render but only if there is a real change
        todos: TodoModel.selectTodos(state)
    })
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle, StatefulLifecycle<IRootState> {

    constructor(
        public props: TodoListProps,
        public state: IRootState,
        protected todoService: TodoService,
        protected router: Router,
    ) {
        super();
    }

    init() {
        this.props.todos = TodoModel.selectTodos(this.state);
    }

    onListItemClick = (id: number) => {
        this.router.navigate(ExampleTodoDetail, {id});
    };

    onAddItem = () => {

        // TODO: Show dialog to add item
        this.todoService.addItem();
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