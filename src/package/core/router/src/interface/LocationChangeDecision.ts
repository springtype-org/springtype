import {VirtualElement} from "../../../renderer/src/interface/IReactCreateElement";

export interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    component: VirtualElement;
    params: Object;
    route: string;
}