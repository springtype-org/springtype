import {st} from "../../core";
import {IRouteMatch} from "./interface";
import {TYPE_UNDEFINED} from "../../core/lang/type-undefined";
import {TYPE_FUNCTION} from "../../core/lang/type-function";
import {castIntrinsic} from "../../core/lang/cast-intrinsic";
import {GlobalCache} from "../../core/st/interface/i$st";

// matches when no route matches (not even partially!), basically like HTTP ERROR 404 NOT FOUND behaviour
export const PATH_WILDCARD = "*";

// matches when no path is given, like: /, /#, /#/
export const PATH_START = "";

if (!st.router) {

    const PATH_SEP = "/";
    const PATH_PARAM_PREFIX = ":";
    const PATH_TOKEN_MISSING = "TOKEN_MISSING:ACTUAL_PATH_LONGER";

    st.router = {
        match: {},

        // necessary for operations to act on location change
        ON_LOCATION_CHANGE_HANDLERS: [],

        // necessary for operations that belong to .match being validated already
        ON_AFTER_MATCH_HANDLERS: [],

        tokenizedActualPath: [],
        prefix: '#/',
        enabled: false,
        paramsChanged: false,

        addOnAfterMatchHandler: (handler: Function) => {
            st.router.ON_AFTER_MATCH_HANDLERS.push(handler);
        },

        removeOnAfterMatchHandler: (handler: Function) => {
            const index = st.router.ON_AFTER_MATCH_HANDLERS.indexOf(handler);
            if (index > -1) {
                st.router.ON_AFTER_MATCH_HANDLERS.splice(index, 1);
            }
        },

        callOnAfterMatchHandlers: async () => {
            for (let handler of st.router.ON_AFTER_MATCH_HANDLERS) {
                handler();
            }
            if (st.router.paramsChanged) {

                for (let cmp of st[GlobalCache.COMPONENT_INSTANCES]) {
                    if (typeof cmp.onRouteParamsChanged === TYPE_FUNCTION) {
                        cmp.onRouteParamsChanged(st.router.match!.params);
                    }
                }
            }
        },

        addOnLocationChangeHandler: (handler: () => Promise<void>) => {
            st.router.ON_LOCATION_CHANGE_HANDLERS.push(handler);
        },

        removeOnLocationChangeHandler: (handler: () => Promise<void>) => {
            const index = st.router.ON_LOCATION_CHANGE_HANDLERS.indexOf(handler);
            if (index > -1) {
                st.router.ON_LOCATION_CHANGE_HANDLERS.splice(index, 1);
            }
        },

        callOnLocationChangeHandlers: () => {
            st.router.match = {};
            for (const handler of st.router.ON_LOCATION_CHANGE_HANDLERS) {
                handler();
            }
        },

        tokenize: (urlPath: string): Array<string> => {
            return urlPath.split(PATH_SEP);
        },

        doMatch: (tokenizedMatchPath: Array<string>, path: string): IRouteMatch | undefined => {

            // local temp. match
            const match: IRouteMatch = {
                isExact: true,
                isPartial: false,
                params: {},
                paths: [],
                path
            };

            const maxLength = tokenizedMatchPath.length > st.router.tokenizedActualPath.length ?
                tokenizedMatchPath.length : st.router.tokenizedActualPath.length;

            for (let i = 0; i < maxLength; i++) {

                // allow for "" to be a valid token, but not undefined
                const pathToken = typeof tokenizedMatchPath[i] !== TYPE_UNDEFINED ?
                    tokenizedMatchPath[i] : PATH_TOKEN_MISSING;

                // looks like a parameter because it starts with ":"
                if (pathToken.startsWith(PATH_PARAM_PREFIX)) {
                    // cut away first char (":")
                    const paramName = pathToken.substring(1);

                    if (match.params![paramName] !== st.router.tokenizedActualPath[i]) {
                        st.router.paramsChanged = true;
                        // casts intrinsically based on the string syntax ("0.012" -> float number, "true" -> true etc.)
                        match.params![paramName] = castIntrinsic(st.router.tokenizedActualPath[i]);
                    }
                } else if (!st.router.tokenizedActualPath[i] && tokenizedMatchPath[i]) {

                    match.isExact = false;
                    match.isPartial = false;
                    // e.g. match path: "blog/page/9" vs. actual path: "blog"
                    break;

                } else {
                    // match the actual path token with the candidates token at the same position
                    if (typeof st.router.tokenizedActualPath[i] != TYPE_UNDEFINED &&
                        pathToken === st.router.tokenizedActualPath[i]) {

                        match.isPartial = true;

                    } else {
                        // can't be an exact match anymore, because one position didn't match
                        match.isExact = false;
                    }
                }
            }

            if (match.isPartial || match.isExact) {
                return match;
            }
        },

        // for: /#/home/foo, #home/foo, /home/foo
        // always return: home/foo
        getUrlPath: (pathnameOrHash: string): string => {
            // pathname always starts with "/" and hash always with "#" -> cut em out
            let urlPath = pathnameOrHash.substring(1);

            // in case of /#/foo
            if (urlPath.indexOf(PATH_SEP) === 0) {
                urlPath = urlPath.substring(1);
            }

            // strip leading /
            urlPath = st.router.removeTrailingSep(urlPath);
            return urlPath;
        },

        removeTrailingSep: (url: string): string => {
            return url[url.length - 1] === PATH_SEP ? url.substring(0, url.length - 1) : url;
        },

        createMatcher: (
            matchPath: string | Array<string>,
            onMatch: (path: string, match: IRouteMatch) => void,
            onMismatch: (path: string) => void): Function => {

            // one-time closure cache, tokenize the path 1x
            const tokenizedPaths: Array<Array<string>> = [];
            const nonTokenizedPaths: Array<string> = [];

            if (!Array.isArray(matchPath)) {
                matchPath = [matchPath];
            }

            for (let path of matchPath) {
                tokenizedPaths.push(st.router.tokenize(st.router.removeTrailingSep(path)))
                nonTokenizedPaths.push(path);
            }

            const matchAndNotify = (tokenizedPath: Array<Array<string>>, nonTokenizedPath: Array<string>) => {
                st.router.initMatch();

                for (let i = 0; i < tokenizedPath.length; i++) {
                    const match = st.router.doMatch(tokenizedPath[i], nonTokenizedPath[i]);
                    if (match) {
                        st.router.updateMatch(match, nonTokenizedPaths);
                        onMatch(nonTokenizedPath[i], match);
                    } else {
                        onMismatch(nonTokenizedPath[i]);
                    }
                }
            };

            return () => {
                matchAndNotify(tokenizedPaths, nonTokenizedPaths);
            }
        },

        updateMatch: (match: IRouteMatch, nonTokenizedPaths: Array<string>) => {
            for (const nonTokenizedPath of nonTokenizedPaths) {
                st.router.match[nonTokenizedPath] = match;
            }
        },

        initMatch: () => {
            if (!st.router.match) {
                st.router.match = {}
            }
        },

        tokenizeActualPath: () => {

            // cache tokenized actual path
            st.router.tokenizedActualPath = st.router.tokenize(
                st.router.getUrlPath(window.location.hash || window.location.pathname)
            );
        },

        onLocationChange: () => {

            // early return if there are no registered location change handlers
            if (!st.router.ON_LOCATION_CHANGE_HANDLERS.length) return;

            // called initially AND when location changes

            // reset match
            delete st.router.match;
            st.router.paramsChanged = false;

            st.router.tokenizeActualPath();

            // run matchers
            st.router.callOnLocationChangeHandlers();
            st.router.callOnAfterMatchHandlers();

            if (!Object.keys(st.router.match).length) {

                st.router.tokenizedActualPath = [PATH_WILDCARD];
                st.router.callOnLocationChangeHandlers();
                st.router.callOnAfterMatchHandlers();

                if (!st.router.match) {

                    if (process.env.NODE_ENV === 'development') {
                        st.error('Not a single route provided via <Route> or <RouteList> did match.');
                    }
                }
            }
        },

        enable: (): void => {

            if (!st.router.enabled) {

                st.router.enabled = true;

                st.router.onLocationChange();

                if (!window.onpopstate) {
                    window.onpopstate = st.router.onLocationChange;
                }
            }
        },

        materialize: (route: string, params?: any): string => {

            if (!params) return route;

            // we take a route like /blog/:post-id and params like { "post-id": 5 }
            // and produce /blog/5 to transform it into a navigatable URL again
            for (let param in params) {
                route = route.replace(PATH_PARAM_PREFIX + param, params[param]);
            }
            return route;
        },

        navigate: (route: string, params?: any): void => {
            window.location.href = st.router.prefix + st.router.materialize(route, params);
        }
    };

    // allows st.route = { ... } to actually change the route
    // and st.route to actually return the latest match
    Object.defineProperty(st, 'route', {

        set: (value: IRouteMatch) => {
            st.router.navigate(value.path, value.params);
        },

        get: () => {
            const matchers = Object.values(st.router.match);
            const exactMatch = matchers.find(m => m.isExact);
            if (exactMatch) {
                return exactMatch;
            }
            if (matchers.length) {
                return matchers[0];
            }
        }

    });

} else {
    if (process.env.NODE_ENV === 'development') {
        st.warn('Module router is loaded twice. Check for duplicate famework import!');
    }
}