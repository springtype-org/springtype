import { I$st } from "./interface/i$st";
// makes sure the global storage is not re-initialized
// and overwritten on subsequent calls / file imports
if (!window.$st) {

    // register scoped global as an instance of this class
    (window.$st as any) = {};
}

export const st: I$st = window.$st;
