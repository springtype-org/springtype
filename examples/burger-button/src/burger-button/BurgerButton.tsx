import {Attribute, Template, Element, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
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

@Element('burger-button')
@Template(template)
export class BurgerButton extends HTMLElement implements  WebComponentLifecycle {
    open = false;

    @Attribute
    public props: BurgerButtonProps = {
        type: BurgerType.SWORD,
        width: 50,
        onClose: () => {},
        onOpen: () => {}
    };

    // TODO: Rewrite: Never access DOM directly!
    onBurgerClick = (evt: Event, element: any) => {

        this.open = !this.open;
        if (this.open) {
            evt.currentTarget!.classList.add('active');
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        } else {
            evt.currentTarget!.classList.remove('active');
            if (this.props.onClose) {
                this.props.onClose();
            }
        }
    };

}