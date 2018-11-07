import {WebComponent} from "../../../src/package/html";
import template from "./BurgerButtonExample.tpl";

@WebComponent({
    tag: 'burger-button-example',
    template
})
export class BurgerButtonExample extends HTMLElement {}