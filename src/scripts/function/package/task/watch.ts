import {spawnCmd} from "../../system/spawnCmd";

export const watch = async() => {

    // watch
    await spawnCmd('tsc', ['-w']);
};