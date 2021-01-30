import { I$st } from "./interface/i$st";

const ST_KEY = "$st";

// scoped local global storage reference
const _globalThis: any = new Function("return this")();

// makes sure the global storage is not re-initialized
// and overwritten on subsequent calls / file imports
if (!_globalThis[ST_KEY]) {

  // register scoped global as an instance of this class
  _globalThis[ST_KEY] = {};
}

export const globalThis: any = _globalThis;
export const st: I$st = _globalThis[ST_KEY];

if (!st.globalThis) {
  st.globalThis = globalThis;
}