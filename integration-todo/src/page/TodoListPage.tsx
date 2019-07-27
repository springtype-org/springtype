import {WebComponent, Lifecycle, Style, Use, ActiveRenderer} from "@springtype/core";
import {TodoModel} from "../model/TodoModel";
import {ListInnerPartial} from "../element/list/ListInnerPartial";
import {AppLayout} from "../element/layout/AppLayout";
import {t, Translate} from "@springtype/i18n";
import {style} from "./TodoListPage.style";
import {e2e} from '../e2e';

interface TodoListLocalState {
    newTodoItemText: string;
}

@WebComponent('example-todo-list')
@Style(style)
@Use(AppLayout, ListInnerPartial, Translate)
export class TodoListPage extends HTMLElement implements Lifecycle {

    constructor(
        public localState: TodoListLocalState,
        protected todoModel: TodoModel,
        public textInputEl: HTMLInputElement
    ) {
        super();

        console.log('textInputEl', this.textInputEl);
    }

    onAddItem = () => {

        console.log('onAddItem');

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
                           id={e2e.page.TodoListPage.newTodoItemText}
                           placeholder={t("what_todo_next")}
                           onkeyup={this.onNewTodoTextChange}/>

                    <a className="waves-effect waves-light btn" id={e2e.page.TodoListPage.addButton} onclick={this.onAddItem}>
                        {t('add')}
                    </a>
                </div>
            </app-layout>
        </st-fragment>
    }
}