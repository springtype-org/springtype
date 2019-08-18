import {spawnCmd} from "../../system/spawnCmd";
import {removeFilesCleanAll} from "../removeFilesCleanAll";

export const bootstrap = async() => {

    // remove ./dist, ./node_modules, ./package.lock
    await removeFilesCleanAll();

    // build using typescript compiler
    await spawnCmd('yarn');
};