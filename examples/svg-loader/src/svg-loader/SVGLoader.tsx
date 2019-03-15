import {Attribute, Template, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./SVGLoader.tpl";

export interface LoaderProps {
    type: LoaderType;
    width: number;
}

export enum LoaderType {
    STRANGE, CLOCK, RING, DOTS, DOT_BOUNCE, BOX_LOAD, CIRCLES, SOUND, SOUND_SMALL, CIRCLE
}

@WebComponent('svg-loader')
@Template(template)
export class SVGLoader extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    props: LoaderProps = {
        type: LoaderType.CIRCLE,
        width: 100
    };
}