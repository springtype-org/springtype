import {TodoService} from "../service/TodoService";
import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html/index";
import {Component} from "../../../../src/package/di/index";

@WebComponent({
    tag: 'example-app',

    // use shadow DOM (isolated CSS)
    //shadow: true
})
// make sure @Component is added as last decorator to enable dependency injection
@Component
export class ExampleApp extends HTMLElement implements WebComponentLifecycle {

    render() {

        // web component is attached to this web component node
        return (
            <example-todo-list class='example' />
        );
    }
}