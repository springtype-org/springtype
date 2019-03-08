import template from "./TSStyledComponent.tpl";
import style from "./TSStyledComponent.style";
import {hmrEntrypoint, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import {theme} from "../theme";

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
    style,
    theme
})
export class TSStyledComponent extends HTMLElement implements WebComponentLifecycle {

    // default
    props: Props = {
        styleMode: StyleMode.INVERTED
    };
}