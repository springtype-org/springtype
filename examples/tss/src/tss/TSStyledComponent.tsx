import {WebComponent, WebComponentLifecycle} from "../../../../src/package/html";
import template from "./TSStyledComponent.tpl";
import style from "./TSStyledComponent.style";
import {hmrEntrypoint} from "../../../../src/package/hmr";

hmrEntrypoint(module);

export interface Props {
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

    constructor(
        public props: Props
    ) {
        super();

        console.log('props', props);
    }

    init() {
        this.props.styleMode = StyleMode.INVERTED;
    }
}