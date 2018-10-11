import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html/index";

import template from './ExampleAppLayout.tpl';
import {ExampleTodoList} from "./list/ExampleTodoList";

@WebComponent({

    tag: 'example-app-layout',

    // use shadow DOM (isolated CSS, encapsulates styles so that material design isn't available inside)
    //shadow: true,

    template
})
export class ExampleAppLayout extends HTMLElement implements WebComponentLifecycle {

    protected list!: ExampleTodoList;

    mountChildren() {

        console.log('WebComponent bind', this.list);
    }
}