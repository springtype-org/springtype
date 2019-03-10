import {IComponent} from "../../../di";
import {LocationChangeDecision} from "./RouterImpl";
import {VirtualElement} from "../../../renderer/src/interface/IReactCreateElement";

export interface RouteDefinition {
    component: VirtualElement|IComponent<any>;
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    params?: Object;
}