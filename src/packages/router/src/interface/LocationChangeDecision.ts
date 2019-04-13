import {VirtualElement} from "@springtype/springtype-incubator-core";

export interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    element: VirtualElement;
    params: Object;
    route: string;
}