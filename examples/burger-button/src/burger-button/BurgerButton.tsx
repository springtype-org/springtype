import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./BurgerButton.tpl";
import {WebApp} from "../../../../src/package/html/src/decorator/WebApp";

interface BurgerButtonProps {
    active: boolean;
}

@WebApp({
    routes: {
        '': BurgerButton
    }
})
@WebComponent({
    tag: 'burger-button',
    props: ['active'],
    template
})
export class BurgerButton extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: BurgerButtonProps
    ) {
        super();
        //this.props.active = false;
    }



    onBurgerClick = (evt: any) => {
console.log(evt, 'clicked on burger')
    };

}