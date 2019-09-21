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

const ST_KEY = "$st";

// scoped local global storage reference
const _globalThis: any = typeof window === "undefined" ? global : window;
// makes sure the global storage is not re-initialized
// and overwritten on subsequent calls / file imports
if (!_globalThis[ST_KEY]) {
	// register scoped global as an instance of this class
	_globalThis[ST_KEY] = {};
}

export const globalThis: any = _globalThis;
export const st: IST = _globalThis[ST_KEY];
