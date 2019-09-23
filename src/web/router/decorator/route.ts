import { st } from "../../../core";
import { IVirtualNode } from "../../vdom/interface/ivirtual-node";
import "../router";
import "../router-outlet";

export const route = (route: string, routeTargetWebComponent: IVirtualNode | any): any => {
  return (targetWebComponent: any) => {
    st.router.registerRoutes({
      [route]: routeTargetWebComponent,
    });
    return targetWebComponent;
  };
};
