import template from "./TSStyledComponent.tpl";
import style from "./TSStyledComponent.style";
import {
    Attribute,
    OnAttributeSet,
    Style, Template,
    WebComponent,
    WebComponentLifecycle
} from "@springtype/springtype-incubator-core";

interface Props {
    styleMode: StyleMode;
}

export enum StyleMode {
    STANDARD, INVERTED
}

@WebComponent({
    tag: 'tsstyled-component',
    shadow: true
})
@Template(template)
@Style(style)
export class TSStyledComponent extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    props: Props = {
        styleMode: Math.random() > 0.5 ? StyleMode.INVERTED : StyleMode.STANDARD
    };

    @OnAttributeSet("props")
    onPropsChanged() {
        console.log('programmatic interception');
    }

    @OnAttributeSet("props")
    onPropsChanged2() {
        console.log('programmatic interception 2');
    }
}