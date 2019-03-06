import {IRootState} from "../../state/IRootState";
import {Partial} from "../../../../../src/package/lang";
import {TodoModel} from "../../model/TodoModel";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {ITodoItem} from "../../state/ITodoState";
import {ROUTE_TODO_DETIALS} from "../../routes";
import {Router} from "../../../../../src/package/html/src/router/Router";

interface TodoListProps {
    todos: Array<ITodoItem>;
}

@WebComponent({

    tag: 'example-list-item-inner',

    // automatically called when the state changes
    mapStateToProps: (state: IRootState): Partial<TodoListProps> => ({

        // map only what you want to map (filter/map/reduce)
        // this might trigger a re-render but only if there is a real change
        todos: TodoModel.selectTodos(state)
    })
})
export class ExampleListInner extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: TodoListProps,
        protected model: TodoModel,
        protected router: Router
    ) {
        super()
    }

    onListItemClick = (id: number) => {
        this.router.navigate(ROUTE_TODO_DETIALS, {id});
    };

    onRemove = async(todoItem: ITodoItem, evt: Event) => {

        console.log('onRemove', todoItem.id);

        evt.preventDefault();
        evt.stopPropagation();

        await this.model.removeTodo(todoItem);

        console.log('Ich wurde gelöscht');

    };

    onDoneToggle = (todo: ITodoItem, evt: Event) => {

        console.log('onDoneToggle', todo);

        evt.preventDefault();
        evt.stopPropagation();

    };

    render() {

        return <ul>
            {
                this.props.todos ?
                    this.props.todos.map((todo: ITodoItem) =>
                        <li onclick={() => {
                            this.onListItemClick(todo.id)
                        }} class="todo-item">
                            {todo.text}

                            <a class="waves-effect waves-light btn" onClick={(evt: Event) => this.onDoneToggle(todo, evt)}>{
                                todo.done ? 'Undone' : 'Done'
                            }</a>

                            <a class="waves-effect waves-light btn" onClick={(evt: Event) => this.onRemove(todo, evt)}>Remove (1 sec)</a>
                        </li>
                    ) : []
            }
        </ul>;
    }
}