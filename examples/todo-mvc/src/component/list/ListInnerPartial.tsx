import {IRootState} from "../../state/IRootState";
import {
    Partial,
    ActiveRoute, VirtualElement,
    Element,
    WebComponentLifecycle, ShadowDOM, ShadowAttachMode
} from "@springtype/springtype-incubator-core";
import {TodoModel} from "../../model/TodoModel";
import {ITodoItem} from "../../state/ITodoState";
import {ROUTE_TODO_DETIALS} from "../../routes";
import {MapStateToField} from "../../../../../src/package/core";

interface LocalTodoListState {
    todos: Array<ITodoItem>;
}

@Element('app-list-inner-partial')
export class ListInnerPartial extends HTMLElement implements WebComponentLifecycle {

    constructor(
        @MapStateToField((state: IRootState): Partial<LocalTodoListState> => ({
            todos: TodoModel.selectTodos(state)
        }))
        public localTodoListState: LocalTodoListState,
        protected model: TodoModel,
        protected activeRoute: ActiveRoute
    ) {
        super();
    }

    onListItemClick = (id: number) => {
        this.activeRoute.navigate(ROUTE_TODO_DETIALS, {id});
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
                (this.localTodoListState.todos || []).sort((a: ITodoItem, b: ITodoItem) => {
                    return a.text > b.text ? 0 : 1
                }).map((todo: ITodoItem) => {
                        const text = todo.done ? <s>{todo.text} </s> : todo.text;
                        const input: VirtualElement = <input type="checkbox"/>;
                        if (todo.done) {
                            input.attributes['checked'] = true;
                        }
                        const onListItemClick = () => {
                            this.onListItemClick(todo.id)
                        };
                        const onDoneToggleClick = (evt: Event) => {
                            console.log('onDoneToggleClick', this);
                            this.onDoneToggle(evt, todo);
                        };

                        const onRemoveClick = (evt: Event) => this.onRemove(evt, todo);

                        return <li key={todo.id} onclick={onListItemClick} class="todo-item">
                            {input}
                            <span
                                onClick={onDoneToggleClick}/>
                            <div class="todo-item-text">{text}</div>
                            <a class="waves-effect waves-light btn"
                               onClick={onRemoveClick}>Remove (after 1 sec)</a>
                        </li>
                    }
                )
            }
        </ul>;
    }
}