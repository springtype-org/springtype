import { st } from "../../../core";
import { IRouteDefinition } from "../interface/irouter";
import "../router";
import "../router-outlet";
import { IComponent } from "./../../component/component";
export const route = (route: string | null, routeTargetWebComponent: IComponent | IRouteDefinition): any => {
  return (targetWebComponent: any) => {
    st.router.registerRoutes({
      [route || ""]: routeTargetWebComponent,
    });
    return targetWebComponent;
  };
};
