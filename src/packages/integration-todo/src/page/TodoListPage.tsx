import {WebComponent, Lifecycle, Style, ActiveRenderer, Provide, Field} from "@springtype/core";
import {TodoModel} from "../model/TodoModel";
import {t} from "@springtype/i18n";
import {style} from "./TodoListPage.style";
import {testSelectors} from '../test-selectors';

interface TodoListLocalState {
    newTodoItemText: string;
}

export interface ListPageLocalChanges {
    newTodoItemText?: string;
}

@WebComponent('example-todo-list')
@Style(style)
export class TodoListPage extends HTMLElement implements Lifecycle {

    @Provide
    @Field
    localChanges: ListPageLocalChanges = {};

    constructor(
        public localState: TodoListLocalState,
        protected todoModel: TodoModel,
        public textInputEl: HTMLInputElement
    ) {
        super();

        console.log('textInputEl', this.textInputEl);
    }

    onAddItem = () => {

        console.log('onAddItem', this.localState.newTodoItemText);

        // change @Provide @Field (just an example for inter-WebComponent communication)
        this.localChanges.newTodoItemText = this.localState.newTodoItemText;

        if (this.textInputEl.value !== '') {

            this.todoModel.addTodo({
                text: this.localState.newTodoItemText,
                id: Date.now(),
                done: false
            });

            this.textInputEl.value = '';
        }
        this.textInputEl.focus();
    };

    onNewTodoTextChange = (evt: any) => {

        if (evt.key === "Enter") {
            this.onAddItem();
        } else {
            this.localState.newTodoItemText = evt.target.value;
        }
        evt.preventDefault();
    };

    render() {

        return <st-fragment>
            <app-layout>
                <div slot="children">

                    <app-list-inner-partial />

                    <input st-inject={{textInputEl: this}}
                           type="text"
                           id={testSelectors.page.TodoListPage.newTodoItemText}
                           placeholder={t("what_todo_next")}
                           onkeyup={this.onNewTodoTextChange}/>

                    <a className="waves-effect waves-light btn" id={testSelectors.page.TodoListPage.addButton} onclick={this.onAddItem}>
                        {t('add')}
                    </a>
                </div>
            </app-layout>
        </st-fragment>
    }
}