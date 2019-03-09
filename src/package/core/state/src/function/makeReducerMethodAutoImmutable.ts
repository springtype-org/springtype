import * as _ from "lodash";

export const makeReducerMethodAutoImmutable = (method: Function): Function => {

    return function(...args: Array<any>) {

        // first argument is always the state
        // clone it, so we can safely work with references
        // in reducers (which only update a sub-state anyway!)
        args[0] = _.cloneDeep(args[0]);

        // @ts-ignore
        return method.apply(this, args);
    }
};