import {Attribute, Element, Lifecycle, Template} from "@springtype/springtype-incubator-core";
import template from "./SVGLoader.tpl";

export interface LoaderProps {
    type: LoaderType;
    width: number;
}

export enum LoaderType {
    STRANGE, CLOCK, RING, DOTS, DOT_BOUNCE, BOX_LOAD, CIRCLES, SOUND, SOUND_SMALL, CIRCLE
}

@Element('svg-loader')
@Template(template)
export class SVGLoader extends HTMLElement implements Lifecycle {

    @Attribute
    props: LoaderProps = {
        type: LoaderType.CIRCLE,
        width: 100
    };
}