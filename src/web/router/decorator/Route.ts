import { st } from "../../../core";
import { IVirtualNode } from "../../vdom/interface/IVirtualNode";
import { Router } from "../Router";

export function Route(
	route: string,
	routeTargetWebComponent: IVirtualNode | any
): any {
	return (targetWebComponent: any) => {
		const router: Router = st.di.get(Router);

		router.registerRoutes({
			[route]: routeTargetWebComponent
		});
		return targetWebComponent;
	};
}
