import {IComponent} from "../../../di";
import {RouteDefinition} from "./RouteDefinition";
import {VirtualElement} from "../../../renderer/src/interface/IReactCreateElement";

export interface Routes {
    [route: string]: RouteDefinition|VirtualElement|IComponent<any>;
}