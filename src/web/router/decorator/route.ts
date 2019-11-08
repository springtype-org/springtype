import { st } from "../../../core";
import { IComponent } from "../../component/interface";
import { IRouteDefinition } from "../interface/irouter";
import "../router";
import "../router-outlet";

export const route = (route: string | null, routeTargetWebComponent: IComponent | IRouteDefinition): any => {
  return (targetWebComponent: any) => {
    st.router.registerRoutes({
      [route || ""]: routeTargetWebComponent,
    });
    return targetWebComponent;
  };
};
