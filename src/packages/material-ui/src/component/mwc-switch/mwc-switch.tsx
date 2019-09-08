import {WebComponent, Style, Template, Attribute, EventAttribute, OnAfterFlow} from "@springtype/core";
import tpl from "./mwc-switch.tpl";
import style from "./mwc-switch.style";
import {MDCSwitch} from '@material/switch';

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

    @OnAfterFlow(true)
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

