import {removeDistFolder} from "../removeDistFolder";
import {spawnCmd} from "../../system/spawnCmd";
import {finalizeDistFolder} from "../finalizeDistFolder";

export const build = async() => {

    // remove ./dist (clean)
    await removeDistFolder();

    // build using typescript compiler
    await spawnCmd('tsc');

    // finalize the ./dist folder
    await finalizeDistFolder();
};