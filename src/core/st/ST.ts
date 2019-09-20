import { IST } from "./interface/IST";

/**
 * μ is pronounced /mei/ and stands for "micro".
 * Because μ is not easy to write, we transliterate it to "my".
 *
 * You can access all states and functionallity of the framework
 * by importing the "my" object like: import { my } from "my.ts".
 *
 * The my global object may contain (if imported) the following sub-globals:
 * - di
 * - appState
 * - translate
 * - router
 */
export class ST {
	static readonly KEY = "$st";

	// globalThis without polyfills, supports Node.js and browsers
	static globalThis: any = typeof window === "undefined" ? global : window;

	static init() {
		// makes sure the global storage is not re-initialized
		// and overwritten on subsequent calls / file imports
		if (!ST.globalThis[ST.KEY]) {
			// register scoped global as an instance of this class
			ST.globalThis[ST.KEY] = new ST();
		}
	}
}
ST.init();

export const globalThis: any = ST.globalThis;
export const st: IST = ST.globalThis[ST.KEY];
