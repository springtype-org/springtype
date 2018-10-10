import {Todo, TodoService} from "../../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html/src/decorator/WebComponent";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {RenderStrategy} from "../../../../../src/package/html";

interface TodoListState {
    todos: Array<Todo>;
}

@WebComponent({

    // name of the element. Here: <example-todo-list>
    tag: 'example-todo-list',

    // attributes to react on: <example-todo-list lala={ 123 } />
    attributes: ['lala'],

    // re-render strategy (manually call this.reflow() or let the framework do it?)
    renderStrategy: RenderStrategy.OnStateChange
})
export class ExampleTodoList extends HTMLElement implements WebComponentLifecycle {

    constructor(
        // an attribute; must be public as it is accessible publicly
        public lala: number,

        // injected, typed state; must be public as
        public state: TodoListState,

        // injected service to load data
        protected todoService: TodoService,

        // injected router to getParams() and navigate()
        protected router: Router) {

        super();

        // one-time fetch todo items (before render and mount)
        this.state.todos = this.todoService.getTodos();
    }

    /**
     * Directly bound DOM event handler.
     * Receives a native DOM event object.
     */
    onListItemClick = (evt: Event) => {

        console.log('List item click this.lala?', evt.target);

        /*
        this.router.navigate(ExampleTodoDetail, {
           id:
        });
        */
    };

    /**
     * - Attributes set (on this.*)
     * - Children rendered
     * - This element has been added to a parent DOM element
     */
    mount() {

        console.log('mounted');

        console.log('getAttribute("lala")', this.lala);
        console.log('parent element', this.parentNode);
    }

    /**
     * You can implement this method or (alternatively)
     * set a `template` function in @WebComponent (see: imprint/ImprintPage.tsx)
     */
    render() {

        console.log('render called ExampleTodoList');

        // loop rendering is inherent
        const listItems = this.state.todos.map((todo: Todo) =>
            <li onclick={ this.onListItemClick }>
                <a href={ `/#/todo/${todo.id}` }>{ todo.text }</a>
            </li>
        );

        // what is returned, will be attached to this node
        return (
            <div>
                <h2>TODO's:</h2>
                <ul>{ listItems }</ul>
            </div>
        );
    }
}