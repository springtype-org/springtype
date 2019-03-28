import {ComponentImpl} from "@springtype/springtype-incubator-core";
import {RouteDefinition} from "./RouteDefinition";
import {VirtualElement} from "@springtype/springtype-incubator-core";

export interface Routes {
    [route: string]: RouteDefinition|VirtualElement|ComponentImpl<any>;
}