import { ActiveRenderer, Consume, Field, Lifecycle, OnFieldChange, Partial, Style, VirtualElement, WebComponent } from "@springtype/core";
import { t } from "@springtype/i18n";
import { ActiveRoute } from "@springtype/router";
import { MapStateToField } from "@springtype/state";
import { ROUTE_TODO_DETIALS } from "../../index.module";
import { TodoModel } from "../../model/TodoModel";
import { ListPageLocalChanges, TodoListPage } from "../../page/TodoListPage";
import { IRootState } from "../../state/IRootState";
import { ITodoItem } from "../../state/ITodoState";
import { testSelectors } from "../../test-selectors";
import { style } from "./ListInnerPartial.style";

interface LocalTodoListState {
    todos: Array<ITodoItem>;
}

@Style(style)
@WebComponent(testSelectors.element["app-list-inner-partial"])
export class ListInnerPartial extends HTMLElement implements Lifecycle {

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

    @Field
    @Consume(TodoListPage, 'localChanges')
    listPageLocalChanges: ListPageLocalChanges;

    @OnFieldChange('listPageLocalChanges')
    onConsumerFieldChange() {

        console.log('WebComponent ListInnerPartial received changes from WebComponent ListPage',
            this.listPageLocalChanges.newTodoItemText);
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
                                onclick={onDoneToggleClick}/>
                            <div class="todo-item-text">{text}</div>
                            <a class="waves-effect waves-light btn"
                               onclick={onRemoveClick}>{t('remove')}</a>
                        </li>
                    }
                )
            }
        </ul>;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-list-inner-partial': Partial<ListInnerPartial>;
        }
    }
}