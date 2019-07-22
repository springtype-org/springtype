import {Attribute, Lifecycle, Partial, Template, Use, WebComponent} from "@springtype/core";
import {MWCButton, MWCCheckbox} from "../..";
import {template} from "./buttonPage.tpl";


@Use(MWCButton)
@Use(MWCCheckbox)

@WebComponent('button-page')
@Template(template)
export class ButtonPage extends HTMLElement implements Lifecycle {

    @Attribute
    public outlined: boolean = false;

    @Attribute
    public raised: boolean = false;

    @Attribute
    public unelevated: boolean = false;

    @Attribute
    public dense: boolean = false;

    @Attribute
    public disabled: boolean = false;

    @Attribute
    public ripple: boolean = true;

    constructor() {
        super();
    }

}


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'button-page': Partial<ButtonPage>;
        }
    }
}