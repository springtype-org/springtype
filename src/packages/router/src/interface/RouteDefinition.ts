import {ComponentImpl, VirtualElement} from "@springtype/springtype-incubator-core";
import {LocationChangeDecision} from "./LocationChangeDecision";

export interface RouteDefinition {
    component: VirtualElement|ComponentImpl<any>;
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    params?: Object;
}