import {Template, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./BurgerExample.tpl";


@WebComponent('burger-example')
@Template(template)
export class BurgerExample extends HTMLElement implements WebComponentLifecycle {

    constructor() {
        super()
    }

    init(): void {
    }
}