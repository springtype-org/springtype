import { st } from "../../../core";
import { ICustomHTMLElement } from "../../customelement/interface";
import { IRouteDefinition } from "../interface/irouter";
import "../router";
import "../router-outlet";

export const route = (route: string | null, routeTargetWebComponent: ICustomHTMLElement | IRouteDefinition): any => {
  return (targetWebComponent: any) => {
    st.router.registerRoutes({
      [route || ""]: routeTargetWebComponent,
    });
    return targetWebComponent;
  };
};
