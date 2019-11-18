import { st } from "../../core";
import { IRoute } from "./interface/iroute";
import { IRouteMatch } from "./interface/iroute-match";
import { TYPE_UNDEFINED } from "../../core/lang/type-undefined";

// matches when no route matches (not even partially!), basically like HTTP ERROR 404 NOT FOUND behaviour
export const PATH_WILDCARD = "*";

// matches when no path is given, like: /, /#, /#/
export const PATH_DEFAULT = "";

if (!st.router) {
  const PATH_SEP = "/";
  const PATH_PARAM_PREFIX = ":";
  const PATH_HASH = "#";
  const PATH_TOKEN_MISSING = "TOKEN_MISSING:ACTUAL_PATH_LONGER";

  st.router = {
    TOKENIZED_REGISTERED_PATHS: {},
    WILDCARD_ROUTES: [],
    ENTERED_ROUTES: [],

    match: {
      isExact: false,
      isPartial: false,
      paramsChanged: false,
      params: {},
      path: "",
      url: "",
      routes: [],
      maxMatchPathLength: 0,
    },

    tokenize: (urlPath: string): Array<string> => {
      // strip leading /#/, #/, /# and /
      urlPath = urlPath.replace(/^(\/#\/|#\/|\/#|\/)/g, "");

      // strip trailing /
      urlPath = urlPath.replace(/\/$/g, "");

      return urlPath.split(PATH_SEP);
    },

    registerPaths: (paths: string | Array<string>, route: IRoute) => {
      if (!Array.isArray(paths)) {
        paths = [paths];
      }

      for (let path of paths) {
        // remember wildcard routes
        if (path === PATH_WILDCARD) {
          st.router.WILDCARD_ROUTES.push(route);
        }

        // remember paths assigned to routes
        st.router.TOKENIZED_REGISTERED_PATHS[path] = {
          tokens: st.router.tokenize(st.router.getUrlPath(path)),
          route,
        };
      }
    },

    // constructs: /, /# or /#/ prefix for the url depending on the actual URL
    getActualUrlPrefix: () => {
      // case: /
      if (document.location.href.indexOf(PATH_HASH) === -1) {
        return PATH_SEP;
      }
      return document.location.hash[1] === PATH_SEP ? PATH_SEP + PATH_HASH + PATH_SEP : PATH_SEP + PATH_HASH;
    },

    doMatchUrlPath: async (urlPath: string) => {
      const tokenizedActualPath = st.router.tokenize(urlPath);
      let paramCount = 0;

      let foundAnyMatch = false;

      const match: Partial<IRouteMatch> = {
        isExact: true,
        paramsChanged: false,
        params: {},
        routes: [],
        maxMatchPathLength: 0,
      };

      for (let registeredPath in st.router.TOKENIZED_REGISTERED_PATHS) {
        const tokenizedPathCandidate = st.router.TOKENIZED_REGISTERED_PATHS[registeredPath];

        // reset for possible exact match for this candidate
        match.isExact = true;
        match.isPartial = false;

        for (let i = 0; i < tokenizedActualPath.length; i++) {
          // allow for "" to be a valid token, but not undefined
          const pathToken =
            typeof tokenizedPathCandidate.tokens[i] !== TYPE_UNDEFINED
              ? tokenizedPathCandidate.tokens[i]
              : PATH_TOKEN_MISSING;

          // looks like a parameter
          if (pathToken.startsWith(PATH_PARAM_PREFIX)) {
            const paramName = pathToken.replace(PATH_PARAM_PREFIX, "");
            // assign the parameter
            match.params![paramName] = tokenizedActualPath[i];

            if (st.router.match.params[paramName] !== match.params![paramName]) {
              match.paramsChanged = true;
            }
            paramCount++;
          } else {
            // match the actual path token with the candidates token at the same position
            if (pathToken && tokenizedActualPath[i] && pathToken === tokenizedActualPath[i]) {
              match.isPartial = true;
            } else {
              // can't be an exact match anymore, because one position didn't match
              match.isExact = false;
            }
          }
        }

        // once we have a single partial match, inform all handlers
        // the handlers may decide what to do based on their configuration
        if (match.isPartial || match.isExact) {
          // definitely found some match
          foundAnyMatch = true;

          // remember the path
          match.path = registeredPath;

          const matchPathLength = tokenizedPathCandidate.tokens.length - paramCount;

          if (matchPathLength > match.maxMatchPathLength!) {
            match.maxMatchPathLength = matchPathLength;
          }

          st.router.setMatch(urlPath, match as IRouteMatch);

          // adding matching routes
          match.routes!.push(tokenizedPathCandidate.route);
        }
      }

      // activate the wildcard match, e.g. show a default <Route /> or 404,
      // depends on the app implementation
      if (!foundAnyMatch) {
        match.isExact = true;
        match.path = PATH_WILDCARD;
        match.routes = st.router.WILDCARD_ROUTES;

        st.router.setMatch(urlPath, match as IRouteMatch);
      }

      if (match.routes && match.routes.length) {
        await st.router.enterRoutes(match.routes!);

        if (match.path !== PATH_WILDCARD && match.path !== PATH_DEFAULT) {
          const actualRouteLength = tokenizedActualPath.length - paramCount;

          // support for initial deep-linking: if the route is initially set like /blog/post/1
          // but the initial match only knows a relative route like /blog because
          // further/deeper <Route />s are not rendered on the first page,
          // we detect the length mismatch here and go recursive until
          // all levels are rendered or we hit the wildcard end
          if (actualRouteLength > match.maxMatchPathLength!) {
            st.router.doMatchUrlPath(urlPath);
          }
        }
      }
    },

    enterRoutes: async (routes: Array<IRoute>) => {

      console.log('router enterRoutes');

      for (let route of st.router.ENTERED_ROUTES) {
        await route.onLeave();
      }

      // remember routes entered, so we can leave them on next enter
      st.router.ENTERED_ROUTES = [];

      for (let route of routes) {

        await route.onEnter(st.router.match!);

        st.router.ENTERED_ROUTES.push(route);
      }
    },

    setMatch: (urlPath: string, match: IRouteMatch): void => {

      console.log('router setMatch');

      // update actual URL (might have changed from /#/ to / or to /# or else)
      match.url = `${st.router.getActualUrlPrefix()}${urlPath}`;
      // set match cache for public API lookup
      st.router.match = match;
    },

    disable: (): void => {
      // numb callback
      window.onpopstate = null;
    },

    // for: /#/home/foo, #home/foo, /home/foo
    // alwas return: home/foo
    getUrlPath: (pathnameOrHash: string): string => {
      // pathname always starts with "/" and hash always with "#" -> cut em out
      let urlPath = pathnameOrHash.substring(1);

      // in case of /#/foo
      if (urlPath.indexOf(PATH_SEP) === 0) {
        urlPath = urlPath.substring(1);
      }
      return urlPath;
    },

    onLocationChange: async (): Promise<void> => {
      await st.router.doMatchUrlPath(st.router.getUrlPath(window.location.hash || window.location.pathname));
    },

    enable: async (): Promise<void> => {
      if (!window.onpopstate) {
        window.onpopstate = async () => {
          await st.router.onLocationChange();
        };
        await st.router.onLocationChange();
      }
    },

    navigate: (route?: string, params?: any): IRouteMatch | undefined => {
      // should route somewhere
      if (route) {
        // we take a route like /blog/:post-id and params like { "post-id": 5 }
        // and produce /blog/5 to transform it into a navigatable URL again
        for (let param in params) {
          if (params.hasOwnProperty(param)) {
            route = route.replace(PATH_PARAM_PREFIX + param, params[param]);
          }
        }
        // actually set the new route
        window.location.href = route;
      } else {
        // wants to fetch the current route information
        return st.router.match;
      }
    },

    // defined below
    route: {} as any
  };

  Object.defineProperty(st, 'route', {

    set: (value: IRouteMatch) => {
      st.router.navigate(value.path, value.params);
    },

    get: () => {
      return st.router.match;
    }
  });
}
