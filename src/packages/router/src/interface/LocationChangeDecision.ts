import {VirtualElement} from "@springtype/core";

export interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    element: VirtualElement;
    params: Object;
    route: string;
}