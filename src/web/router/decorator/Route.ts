import { st } from "../../../core";
import { IVirtualNode } from "../../vdom/interface/IVirtualNode";

export function route(
	route: string,
	routeTargetWebComponent: IVirtualNode | any
): any {
	return (targetWebComponent: any) => {
		st.router.registerRoutes({
			[route]: routeTargetWebComponent
		});
		return targetWebComponent;
	};
}
