import {VirtualElement} from "@springtype/springtype-incubator-core";

export interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    component: VirtualElement;
    params: Object;
    route: string;
}