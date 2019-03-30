import {ComponentImpl, VirtualElement} from "@springtype/springtype-incubator-core";
import {RouteDefinition} from "./RouteDefinition";

export interface Routes {
    [route: string]: RouteDefinition|VirtualElement|ComponentImpl<any>;
}