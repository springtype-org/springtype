import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./TSStyledComponent.tpl";
import style from "./TSStyledComponent.style";
import {hmrEntrypoint} from "../../../../src/package/hmr";
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