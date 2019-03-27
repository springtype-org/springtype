export const buffer = (fn: Function, ms: number, returnPromise: boolean = true) => {

    let currentPromise: Promise<any>|null;
    let resolveFn: Function;

    const guaranteePromise = () => {
        if (!currentPromise) {
            currentPromise = new Promise((resolve) => {
                resolveFn = resolve;
            });
        }
        return currentPromise;
    };

    const invalidatePromise = () => {
        currentPromise = null;
    };

    const bufferedFn = function(...args: any) {

        let returnValue;
        let guaranteedPromise = guaranteePromise();

        // ms
        const bufferTime: number = Reflect.get(bufferedFn, 'BUFFER_TIME') || 0;
        const lastCallTimestamp: number = Reflect.get(bufferedFn, 'BUFFER_LAST_CALL') || 0;

        if (!lastCallTimestamp || lastCallTimestamp < (Date.now() - bufferTime)) {

            returnValue = fn(...args);

            Reflect.set(bufferedFn, 'BUFFER_LAST_CALL', Date.now());

            if (returnPromise) {
                resolveFn(returnValue);
            }
            invalidatePromise();
        }

        if (returnPromise) {
            return guaranteedPromise;
        } else {
            return returnValue;
        }
    };

    Reflect.set(bufferedFn, 'BUFFER_TIME', ms);

    return bufferedFn;
};