import {ComponentImpl} from "../../../di";
import {LocationChangeDecision} from "./LocationChangeDecision";
import {VirtualElement} from "../../../renderer";

export interface RouteDefinition {
    component: VirtualElement|ComponentImpl<any>;
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    params?: Object;
}