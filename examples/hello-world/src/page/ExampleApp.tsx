import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html/index";

import template from './ExampleApp.tpl';

@WebComponent({

    tag: 'example-app',

    // use shadow DOM (isolated CSS, encapsulates styles so that material design isn't available inside)
    //shadow: true,

    template
})
export class ExampleApp extends HTMLElement {

}