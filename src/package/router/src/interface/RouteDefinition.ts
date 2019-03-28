import {ComponentImpl} from "@springtype/springtype-incubator-core";
import {LocationChangeDecision} from "./LocationChangeDecision";
import {VirtualElement} from "@springtype/springtype-incubator-core";

export interface RouteDefinition {
    component: VirtualElement|ComponentImpl<any>;
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    params?: Object;
}