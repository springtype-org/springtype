import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./BurgerButton.tpl";

export interface BurgerButtonProps {
    type: BurgerType;
}

export enum BurgerType {
    SWORD, ARROW_LEFT, CLOSE, ROUND_CONNER, ARROW_LEFT_TURN, AWESOME, SWORD_CROSS, TURN
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
        this.props.type = BurgerType.ROUND_CONNER;
    }


    onBurgerClick = (evt: any, element: any) => {
        element.classList.toggle('active');
    };


}