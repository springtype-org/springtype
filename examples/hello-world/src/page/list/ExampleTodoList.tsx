import {TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {ExampleTodoDetail} from "../detail/ExampleTodoDetail";
import {ITodoItem} from "../../state/ITodoState";

interface TodoListProps {
    todos: Array<ITodoItem>;
    lol: number;
    test: Array<string>;
}

@WebComponent({

    // name of the element. Here: <example-todo-list>
    tag: 'example-todo-list',

    // TODO: Remove support for kebab-case! Use camelCase forever...
    // props to react on: <example-todo-list static-todo-id={ 2 } />
    props: ['static-todo-id'], // accessed as camelCase: this.staticTodoId
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle {

    constructor(

        protected h2: HTMLHeadingElement,
        // an attribute; must be public as it is accessible publicly
        public staticTodoId: number,
        // injected, typed props; must be public as
        public props: TodoListProps,
        // injected service to load data
        protected todoService: TodoService,
        // injected router to getParams() and navigate()
        protected router: Router,
    ) {

        super();

        // one-time fetch todo items (before render and mount)
        this.props.todos = this.todoService.getTodos();
    }

    /**
     * Directly bound DOM event handler.
     * Receives a native DOM event object.
     */
    onListItemClick = (evt: Event) => {

        console.log('List item click this.lala?', evt.target);

        this.router.navigate(ExampleTodoDetail, {
           id: this.staticTodoId
        });
    };

    /**
     * - Attributes set (on this.*)
     * - Children rendered
     * - This element has been added to a parent DOM element
     */
    mount() {

        console.log('transmitted props', this.props);

        console.log('getAttribute("static-todo-id") or just this.staticTodoId: ', this.staticTodoId);
        console.log('parent element', this.parentNode);
    }

    mountChildren() {

        console.log('mounted h2', this.h2);
    }

    /**
     * You can implement this method or (alternatively)
     * set a `template` function in @WebComponent (see: imprint/ImprintPage.tsx)
     */
    render() {

        const listItems = this.props.todos.map((todo: ITodoItem) =>
            <li onclick={ this.onListItemClick } class="todo-item">
                { todo.text }
            </li>
        );

        return (
            <div>
                <h2 bind-h2={ this }>TODO's:</h2>
                <ul>{ listItems }</ul>

                <b>Initial attribute applied state: { this.props.lol }</b>
            </div>
        );
    }
}