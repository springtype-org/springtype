import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./FeatureExample.tpl";

interface BurgerButtonProps {
    menuItems: Array<string>;
    fill: string;
}

@WebComponent({
    tag: 'feature-example',
    template
})
export class FeatureExample extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: BurgerButtonProps,
        public btn: HTMLButtonElement
    ) {
        super();

        this.props.fill = 'yellow';
    }

    // event listeners

    onButtonClick = (evt: Event) => {

        console.log('Burger button was clicked', evt, this.props.menuItems, evt.currentTarget);
        console.log('Access element via this.btn', this.btn);
    };

    onSVGButtonClick = (evt: Event) => {

        console.log('clicked on SVG button', evt.target);
    };
}