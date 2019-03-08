import template from "./TSStyledComponent.tpl";
import style from "./TSStyledComponent.style";
import { WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";

interface Props {
    styleMode: StyleMode;
}

export enum StyleMode {
    STANDARD, INVERTED
}

@WebComponent({
    tag: 'tsstyled-component',
    shadow: true,
    template,
    style
})
export class TSStyledComponent extends HTMLElement implements WebComponentLifecycle {

    constructor(public props: Props) {
        super();
    }

    init() {
        this.props.styleMode = Math.random() > 0.5 ? StyleMode.INVERTED : StyleMode.STANDARD;
    }
}