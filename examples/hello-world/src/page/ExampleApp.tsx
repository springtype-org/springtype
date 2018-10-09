import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html/index";

@WebComponent({
    tag: 'example-app',

    // use shadow DOM (isolated CSS)
    //shadow: true
})
export class ExampleApp extends HTMLElement implements WebComponentLifecycle {

    render() {

        // web component is attached to this web component node
        return (
            <div>
                <example-todo-list lala={ 123 } class='example' />
                <a href="/#/imprint">Imprint</a>
            </div>
        );
    }
}