import {IVirtualNode} from "../../vdom/interface";
import {IRoutePath} from "./iroute-path";

export type IRouterGuardResponse = true | IRoutePath | IVirtualNode;