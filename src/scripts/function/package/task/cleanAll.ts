import {removeFilesCleanAll} from "../removeFilesCleanAll";

export const cleanAll = async() => {

    // remove ./dist, ./node_modules, ./package.lock
    await removeFilesCleanAll();
};