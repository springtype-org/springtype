import {NestedCSSSelectors} from "typestyle/lib/types";
import {VirtualElement} from "../../../renderer";
import {ShadowAttachMode} from "../..";

export interface WebComponentConfig {
    tag: string;

    // @Template
    template?: (view: any) => VirtualElement | Array<VirtualElement>;

    // @Style
    style?: (view: any, theme: any) => NestedCSSSelectors;

    // @ComponentTheme
    theme?: any;

    // @Shadow
    shadow?: boolean;

    // subconfig of @Shadow
    shadowAttachMode?: ShadowAttachMode;
}