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
    props!: BurgerButtonProps;

    constructor(
        public btn: HTMLButtonElement
    ) {
        super();
    }

    init(): void   {
        this.props.fill =  this.props.fill || 'yellow';
        this.props.menuItems =  this.props.menuItems || [];
    };


    // event listeners
    onButtonClick = (evt: Event) => {

        console.log('Burger button was clicked', evt, this.props.menuItems, evt.currentTarget);
        console.log('Access element via this.btn', this.btn);
    };

    onSVGButtonClick = (evt: Event) => {

        console.log('clicked on SVG button', evt.target);
    };
}