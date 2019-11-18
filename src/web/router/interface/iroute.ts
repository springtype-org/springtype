import { IRouteMatch } from "./iroute-match";

export interface IRoute {
  path: string | Array<string>;
  onEnter(match: IRouteMatch): void;
  onLeave(): void;
}
