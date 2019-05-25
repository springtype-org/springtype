import {ComponentImpl, VirtualElement} from "@springtype/core";
import {RouteDefinition} from "./RouteDefinition";

export interface Routes {
    [route: string]: RouteDefinition|VirtualElement|ComponentImpl<any>;
}