import { IRoute } from "./iroute";

export interface IRouteParams {
  [name: string]: any; // name -> value
}

export interface IRouteMatch {
  // only true when /foo/bar is the route and /foo/bar is where you are
  isExact: boolean;

  // true when /foo/bar is the route and /foo is where you are
  isPartial: boolean;

  // detect param changes
  paramsChanged: boolean;

  // the { foo: 'bar' } of /foo/:foo/ or ?foo=bar
  params: IRouteParams;

  // the /foo/:foo of the real-world url /foo/bar
  path: string;

  // the real world /foo/bar which matches the pattern /foo/:foo
  url: string;

  // matching routes
  routes: Array<IRoute>;

  // deep-linking mismatch diagnosis meta data
  maxMatchPathLength: number;
}
