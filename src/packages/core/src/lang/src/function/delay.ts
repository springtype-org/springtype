export const delay = (fn: Function, ms: number) => {

    return function(...args: any) {

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn(...args));
            }, ms);
        });
    };
};