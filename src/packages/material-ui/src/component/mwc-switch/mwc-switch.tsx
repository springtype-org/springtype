import {WebComponent, Lifecycle, Style, Template, Attribute, EventAttribute, Field} from "../../../../core";
import tpl from "./mwc-switch.tpl";
import style from "./mwc-switch.style";
import {MDCSwitch} from '@material/switch';
import {OnBeforeFlow} from "../../../../core/src/webcomponent/src/decorator/lifecyle/OnBeforeFlow";

@WebComponent('mwc-switch')
@Template(tpl)
@Style(style)
export class MwcSwitch extends HTMLElement {
    @Attribute
    checked = false;

    @Attribute
    indeterminate = false;

    @Attribute
    disabled = false;

    @Attribute
    value = '';

    @Attribute
    name = '';

    @Attribute
    label = '';

    @EventAttribute
    onchange = (evt: Event) => {
    };

    mwcInstance: MDCSwitch;

    constructor(protected switchElement: HTMLInputElement) {
        super();
    }

    @OnBeforeFlow(true)
    onBeforeFlow() {
        const switchElement = this.querySelector('.mdc-switch');
        if (switchElement) {
            this.mwcInstance = new MDCSwitch(switchElement);
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-switch': Partial<MwcSwitch>;
        }
    }
}

