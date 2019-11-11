import { IRoute } from "./iroute";
import { IRouteMatch } from "./iroute-match";

export interface IRouter {

  // all paths defined in routes, already tokenized
  // { '/foo/:bar': ['foo', ':bar'], ... }
  TOKENIZED_REGISTERED_PATHS: ITokenizedRoutes;

  // routes that match if nothing else matches (by reference)
  WILDCARD_ROUTES: Array<IRoute>;

  // routes currently entered (by reference)
  ENTERED_ROUTES: Array<IRoute>;

  // current match state e.g.
  // { path: '/foo/:bar', url: '/foo/5', params: { bar: 5 }, isExact: true, isPartial: false, routes: [...] }
  match: IRouteMatch;

  enterRoutes(routes: Array<IRoute>): void;
  setMatch(urlPath: string, match: IRouteMatch): void;
  getActualUrlPrefix(): string;
  getUrlPath(pathnameOrHash: string): string;
  registerPaths(routes: string | Array<string>, route: IRoute): void;
  onLocationChange(): Promise<void>;
  disable(): void;
  enable(): void;
  navigate(path: string, params?: any): void;
  doMatchUrlPath(urlPath: string): void;
  tokenize(urlPath: string): Array<string>;
}

export interface ITokenizedRoutes {
  [route: string]: {
    tokens: Array<string>; // path tokens
    route: IRoute;
  };
}
