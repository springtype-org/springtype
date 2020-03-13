import { IRouteMatch } from "./iroute-match";
import {IRouterGuardResponse} from "./irouter-guard-response";

export type RouteGuard = (match: IRouteMatch) => Promise<IRouterGuardResponse>;
