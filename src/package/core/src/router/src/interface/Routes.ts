import {ComponentImpl} from "../../../di";
import {RouteDefinition} from "./RouteDefinition";
import {VirtualElement} from "../../../renderer";

export interface Routes {
    [route: string]: RouteDefinition|VirtualElement|ComponentImpl<any>;
}