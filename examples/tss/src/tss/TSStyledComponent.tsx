import template from "./TSStyledComponent.tpl";
import style from "./TSStyledComponent.style";
import {Attribute, OnAttributeChange, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";

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
    style,
})
export class TSStyledComponent extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    props: Props = {
        styleMode: StyleMode.STANDARD
    };

    init() {

        console.log('init, this.props', this);

        this.props.styleMode = Math.random() > 0.5 ? StyleMode.INVERTED : StyleMode.STANDARD;
    }

    @OnAttributeChange("props")
    onPropsChanged() {
        console.log('programmatic invocation');
    }

    @OnAttributeChange("props")
    onPropsChanged2() {
        console.log('programmatic invocation2');
    }
}