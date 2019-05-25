import {ComponentImpl, VirtualElement} from "@springtype/core";
import {LocationChangeDecision} from "./LocationChangeDecision";

export interface RouteDefinition {
    element: VirtualElement|ComponentImpl<any>;
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    params?: Object;
}