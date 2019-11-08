import { LogLevel } from "../log/interface";
import { GlobalCache, I$st } from "./interface/i$st";

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
const _globalThis: any = new Function("return this")();

// makes sure the global storage is not re-initialized
// and overwritten on subsequent calls / file imports
if (!_globalThis[ST_KEY]) {
  // register scoped global as an instance of this class
  _globalThis[ST_KEY] = {
    [GlobalCache.COMPONENT_INSTANCES]: [],
    [GlobalCache.CONTEXT]: {},
    [GlobalCache.COMPONENT_REGISTRY]: {},
  };
}

export const globalThis: any = _globalThis;
export const st: I$st = _globalThis[ST_KEY];

// set default core options
if (!st.options) {
  st.options = {
    core: {
      logLevel: LogLevel.WARN,
    },
  };
}
