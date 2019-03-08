import template from "./TSStyledComponent.tpl";
import style from "./TSStyledComponent.style";
import {hmrEntrypoint, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";

hmrEntrypoint(module);

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

    // default
    props: Props = {
        styleMode: StyleMode.INVERTED
    };
}