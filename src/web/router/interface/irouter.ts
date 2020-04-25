import { IRouteMatch } from "./iroute-match";

export interface IRouter {

  // memoized location change handlers (e.g. internal primary change observer and each <Link />)
  ON_LOCATION_CHANGE_HANDLERS: Array<() => Promise<void>>;
  ON_AFTER_MATCH_HANDLERS: Array<Function>;

  // cached tokenized path
  tokenizedActualPath: Array<string>;

  ON_AFTER_CACHE_GROUP_CHANGE_HANDLERS: Array<Function>;
  activeRouteCacheGroup: string;

  // true, if already enabled
  enabled: boolean;

  // cache flag used to determine calls for onRouteParamsChanged() on component instances
  paramsChanged: boolean;

  // current match state e.g.
  // { path: '/foo/:bar', url: '/foo/5', params: { bar: 5 }, isExact: true, isPartial: false, routes: [...] }
  match: {[path: string]: IRouteMatch};

  // defaults to: #/ for "/#/" SPA routing
  prefix: string;

  //active link class
  activeLinkClass: Array<string>;

  materialize(route: string, params?: any): string;
  getUrlPath(pathnameOrHash: string): string;
  getQueryParams(): any;
  removeTrailingSep(url: string): string;
  createMatcher(
    matchPath: string | Array<string>,
    onMatch: (path: string, match: IRouteMatch) => void,
    onMismatch: (path: string) => void): Function;
  enable(): void;
  initMatch(): void;
  updateMatch(match: IRouteMatch, nonTokenizedPaths: Array<string>): void;
  navigate(route?: string | undefined, params?: any): IRouteMatch | void;
  doMatch(tokenizedMatchPath: Array<string>, path: string): IRouteMatch | undefined;
  tokenize(urlPath: string): Array<string>;

  addOnLocationChangeHandler(handler: Function): void;
  addOnAfterMatchHandler(handler: Function): void;
  addOnAfterCacheGroupChangeHandler(handler: Function): void;

  removeOnLocationChangeHandler(handler: Function): void;
  removeOnAfterMatchHandler(handler: Function): void;
  removeOnAfterCacheGroupChangeHandler(handler: Function): void;

  callOnLocationChangeHandlers(): void;
  callOnAfterMatchHandlers(): void;
  callOnAfterCacheGroupChangeHandler(): void;

  tokenizeActualPath(): void;
  onLocationChange(): void;
}
