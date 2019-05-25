import {Attribute, Element, Lifecycle, Template} from "@springtype/core";
import template from "./BurgerButton.tpl";

export interface BurgerButtonProps {
    type: BurgerType;
    width?: number;
    onClose?: Function;
    onOpen?: Function;
}

export enum BurgerType {
    SWORD, ARROW_LEFT, CLOSE, ROUND_CONNER, ARROW_LEFT_TURN, AWESOME, SWORD_CROSS, TURN
}

@Element('burger-button')
@Template(template)
export class BurgerButton extends HTMLElement implements  Lifecycle {

    @Attribute
    public props: BurgerButtonProps = {
        type: BurgerType.SWORD,
        width: 50,
        onClose: () => {},
        onOpen: () => {}
    };

    @Attribute
    public isOpen: boolean = false;

    onBurgerClick = (evt: MouseEvent) => {

        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        } else {
            if (this.props.onClose) {
                this.props.onClose();
            }
        }
    };
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'burger-button': {
                props: BurgerButtonProps
            }
        }
    }
}