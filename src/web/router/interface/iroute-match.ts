export interface IRouteParams {
  [name: string]: number|boolean|string; // name -> value
}

export interface IRouteMatch {
  // only true when /foo/bar is the route and /foo/bar is where you are
  isExact?: boolean;

  // true when /foo/bar is the route and /foo is where you are
  isPartial?: boolean;

  // the { foo: 'bar' } of /foo/:foo/ or ?foo=bar
  params: IRouteParams;

  // the /foo/:foo of the real-world url /foo/bar
  path: string;

  paths: Array<string>;
}
