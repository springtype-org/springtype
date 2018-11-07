import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./BurgerButton.tpl";

export interface BurgerButtonProps {
    type: BurgerType;
    width: number;
    onClose: Function;
    onOpen: Function;
}

export enum BurgerType {
    SWORD, ARROW_LEFT, CLOSE, ROUND_CONNER, ARROW_LEFT_TURN, AWESOME, SWORD_CROSS, TURN
}

@WebComponent({
    tag: 'burger-button',
    template
})
export class BurgerButton extends HTMLElement implements WebComponentLifecycle {
    open = false;

    constructor(
        public props: BurgerButtonProps
    ) {
        super();
        this.props.type = BurgerType.ROUND_CONNER;
        this.props.width = 50;
        this.props.onOpen = () => {
            console.log("Button open event not used")
        };
        this.props.onClose = () => {
            console.log("Button close event not used")
        };

    }


    onBurgerClick = (evt: any, element: any) => {
        this.open = !this.open;
        if (this.open) {
            element.classList.add('active');
            this.props.onOpen();
        } else {
            element.classList.remove('active');
            this.props.onClose();
        }
        return element;
    };


}