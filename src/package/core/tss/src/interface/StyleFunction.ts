import {NestedCSSSelectors} from "typestyle/lib/types";

export interface StyleFunction {
    (webComponent: any, theme?: any): NestedCSSSelectors;
}