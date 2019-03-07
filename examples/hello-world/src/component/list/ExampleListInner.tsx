import {IRootState} from "../../state/IRootState";
import {Partial} from "../../../../../src/package/lang";
import {TodoModel} from "../../model/TodoModel";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {ITodoItem} from "../../state/ITodoState";
import {ROUTE_TODO_DETIALS} from "../../routes";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {IReactCreateElement} from "../../../../../src/package/html/src/ui/TSXRenderer";

interface TodoListProps {
    changed: number;
    todos: Array<ITodoItem>;
}

@WebComponent({

    tag: 'example-list-item-inner',
    // automatically called when the state changes
    mapStateToProps: (state: IRootState): Partial<TodoListProps> => ({
        ...TodoModel.selectTodos(state)
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

    onRemove = async (evt: Event, todoItem: ITodoItem) => {
        evt.preventDefault();
        evt.stopPropagation();

        await this.model.removeTodo(todoItem);
    };

    onDoneToggle = async (evt: Event, todoItem: ITodoItem) => {
        evt.preventDefault();
        evt.stopPropagation();
        await this.model.toggleTodo(todoItem);
    };

    render() {
        return <ul>
            {
                ([...this.props.todos] || []).sort((a: ITodoItem, b: ITodoItem) => {
                    if (!a.done && b.done) {
                        return -1;
                    }
                    if (a.done && !b.done) {
                        return 1;
                    }
                    return 0
                }).map((todo: ITodoItem) => {
                        const text = todo.done ? <s>{todo.text} </s> : todo.text;
                        const input: IReactCreateElement = <input type="checkbox"/>;
                        if (todo.done) {
                            input.attributes['checked'] = true;
                        }
                        return <li onclick={() => {
                            this.onListItemClick(todo.id)
                        }} class="todo-item">
                            {input}
                            <span
                                onClick={(evt: Event) => this.onDoneToggle(evt, todo)}/>
                            <div class="todo-item-text">{text}</div>
                            <a class="waves-effect waves-light btn"
                               onClick={(evt: Event) => this.onRemove(evt, todo)}>Remove (1 sec)</a>
                        </li>
                    }
                )
            }
        </ul>;
    }
}