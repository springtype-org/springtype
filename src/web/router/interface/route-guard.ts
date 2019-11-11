import { IVirtualNode } from "../../vdom/interface";
import { IRouteMatch } from "./iroute-match";

export type RouteGuard = (match: IRouteMatch) => Promise<IVirtualNode>;
