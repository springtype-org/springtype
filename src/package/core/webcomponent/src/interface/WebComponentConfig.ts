import {NestedCSSSelectors} from "typestyle/lib/types";
import {VirtualElement} from "../../../renderer";
import {RenderStrategy, ShadowAttachMode} from "../..";

export interface WebComponentConfig {
    tag: string;
    changeDetectionField?: string;
    template?: (view: any) => VirtualElement | Array<VirtualElement>;
    style?: (view: any, theme: any) => NestedCSSSelectors;
    theme?: any;
    shadow?: boolean;
    shadowAttachMode?: ShadowAttachMode;
    observeAttributes?: Array<string>;

    // TODO: Remove after @MapStateToField
    mapStateToProps?: (state: any) => any;

    // TODO: Remove after @ChangeDetection
    renderStrategy?: RenderStrategy;
}