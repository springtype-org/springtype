import {WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./BurgerExample.tpl";


@WebComponent({
    tag: 'burger-example',
    template
})
export class BurgerExample extends HTMLElement implements WebComponentLifecycle {

    constructor() {
        super()
    }

    init(): void {
    }
}