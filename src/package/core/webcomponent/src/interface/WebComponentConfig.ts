import {NestedCSSSelectors} from "typestyle/lib/types";
import {VirtualElement} from "../../../renderer";
import {RenderStrategy, ShadowAttachMode} from "../..";

export interface WebComponentConfig {
    tag: string;
    propsField?: string;

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

    // TODO: Remove after @ChangeDetection
    renderStrategy?: RenderStrategy;
}