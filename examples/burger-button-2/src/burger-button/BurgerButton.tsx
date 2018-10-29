import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./BurgerButton.tpl";

interface BurgerButtonProps {
    active: boolean;
}

@WebComponent({
    tag: 'burger-button',
    template
})
export class BurgerButton extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: BurgerButtonProps
    ) {
        super();
        this.props.active = false;
    }


    onBurgerClick = (evt: any, element: any) => {
        element.classList.toggle('active');
    };


}