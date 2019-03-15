import {NestedCSSSelectors} from "typestyle/lib/types";
import {VirtualElement} from "../../../renderer";
import {ShadowAttachMode} from "../..";

export interface WebComponentConfig {
    tag: string;

    // @ComponentTheme
    theme?: any;
}