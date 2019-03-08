import {WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
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
export class BurgerButton extends HTMLElement implements  WebComponentLifecycle {
    open = false;

    constructor(public props: BurgerButtonProps) {
        super();
    }

    init() {
        this.props.type = this.props.type || BurgerType.SWORD;
        this.props.width = this.props.width || 50;
        this.props.onClose = this.props.onClose || (() => {
        });
        this.props.onOpen = this.props.onOpen || (() => {
        });
    };

    onBurgerClick = (evt: any, element: any) => {
        this.open = !this.open;
        if (this.open) {
            element.classList.add('active');
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        } else {
            element.classList.remove('active');
            if (this.props.onClose) {
                this.props.onClose();
            }
        }
    };

}