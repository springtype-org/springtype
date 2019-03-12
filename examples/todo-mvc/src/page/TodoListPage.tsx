import {ActiveRoute, UseComponent, WebComponent, WebComponentLifecycle} from "../../../../src/package/core/index";
import {TodoModel} from "../model/TodoModel";
import {ListInnerPartial} from "../component/list/ListInnerPartial";
import {AppLayout} from "../component/layout/AppLayout";

interface TodoListLocalState {
    newTodoItemText: string;
}

@WebComponent({
    tag: 'example-todo-list'
})
@UseComponent(AppLayout)
@UseComponent(ListInnerPartial)
export class TodoListPage extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public localState: TodoListLocalState,
        protected todoModel: TodoModel,
        public textInputEl: HTMLInputElement
    ) {
        super();
    }

    onAddItem = () => {
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

        return <app-layout props={{
            children: <st-fragment>

                <app-list-inner-partial />

                <input bind={{textInputEl: this}}
                       type="text"
                       id="newTodoText"
                       placeholder="What's TODO next?"
                       onKeyUp={this.onNewTodoTextChange}/>

                <a className="waves-effect waves-light btn" onClick={this.onAddItem}>Add</a>
            </st-fragment>
        }} />
    }
}