import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {TodoModel} from "../../model/TodoModel";
import {ExampleListInner} from "./ExampleListInner";

interface TodoListLocalState {
    newTodoItemText: string;
}

@WebComponent({
    tag: 'example-todo-list',

    components: [
        ExampleListInner
    ]
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public localState: TodoListLocalState,
        protected todoModel: TodoModel,
        protected router: Router,
        public textInputEl: HTMLInputElement,
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

        return <st-fragment>

            <example-list-item-inner/>

            <input bind={{textInputEl: this}}
                   type="text"
                   id="newTodoText"
                   placeholder="What's TODO next?"
                   onKeyUp={this.onNewTodoTextChange}/>

            <a className="waves-effect waves-light btn" onClick={this.onAddItem}>Add</a>

        </st-fragment>
    }
}