import {Template, Element, Lifecycle} from "@springtype/springtype-incubator-core";
import template from "./BurgerExample.tpl";


@Element('burger-example')
@Template(template)
export class BurgerExample extends HTMLElement implements Lifecycle {

    constructor() {
        super()
    }

    init(): void {
    }
}