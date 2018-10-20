import {WebComponent} from "../../../../src/package/html";

import template from './ExampleAppLayout.tpl';

@WebComponent({
    tag: 'example-app-layout',
    template
})
export class ExampleAppLayout extends HTMLElement {
}