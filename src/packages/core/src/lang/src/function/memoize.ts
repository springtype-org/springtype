import {Comparator} from "../object/Comparator";

export const memoize = (fn: Function, ignoreArguments: Array<number> = []) => {

    let memoizedReturnValue: any;
    let previousArguments: Array<any> = [];

    const callFunction = (...args: any) => {
        memoizedReturnValue = fn(...args);
        previousArguments = args || [];
    };

    return function(...args: any) {

        // optimization: arguments length differ
        if (previousArguments.length !== args.length) {
            callFunction(...args);
        } else {

            // arguments length is the same, but contents may differ
            for (let i=0; i<args.length; i++) {

                // may fall through by not checking certain arguments
                if (ignoreArguments.indexOf(i) !== -1) continue;

                // if all arguments are equal, nothing happens (return of memoized result value)
                if (!Comparator.isEqual(args[i], previousArguments[i])) {
                    callFunction(...args);
                    break;
                }
            }
        }

        if (typeof memoizedReturnValue === 'object') {
            Reflect.set(memoizedReturnValue, 'IS_MEMORIZED_RETURN_VALUE', true);
        }
        return memoizedReturnValue;
    };
};