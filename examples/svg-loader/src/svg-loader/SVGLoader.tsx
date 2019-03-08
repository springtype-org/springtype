import {WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./SVGLoader.tpl";

export interface LoaderProps {
    type: LoaderType;
    width: number;
}

export enum LoaderType {
    STRANGE, CLOCK, RING, DOTS, DOT_BOUNCE, BOX_LOAD, CIRCLES, SOUND, SOUND_SMALL, CIRCLE
}

@WebComponent({
    tag: 'svg-loader',
    template
})
export class SVGLoader extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: LoaderProps
    ) {
        super();
        this.props.type = LoaderType.CIRCLE;
        this.props.width = 100;
    }

    init = () => {
    }

}