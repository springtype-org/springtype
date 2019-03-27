import {VirtualElement} from "../../../renderer";

export interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    component: VirtualElement;
    params: Object;
    route: string;
}