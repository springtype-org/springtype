import { I$st } from 'springtype-types';

export const ST_KEY = '$st';

// makes sure the global storage is not re-initialized
// and overwritten on subsequent calls / file imports
// istanbul ignore else
if (!window[ST_KEY]) {
  // register scoped global as an instance of this class
  (window[ST_KEY] as any) = {
    state: {},
  };
}

export const st: I$st = window[ST_KEY];
