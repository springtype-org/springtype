import {WebComponent, WebComponentLifecycle, Component} from "../../../dist/index";

import {TodoService} from "./service/TodoService";

import './component/ExampleTodoList';

@WebComponent({
    tag: 'example-app',

    // use shadow DOM (isolated CSS)
    shadow: true
})
@Component
class ExampleAppElement extends HTMLElement implements WebComponentLifecycle {

    // todoService is injected using DI
    constructor(protected todoService: TodoService) {
        super();
    }

    mount() {

        console.log('Application mounted');
    }

    render() {

        // web component is attached to this web component node
        return (
            <example-todo-list todos={ this.todoService.getTodos() } />
        );
    }

    unmount() {

        console.log('Application unmounted (detached from DOM)');
    }
}