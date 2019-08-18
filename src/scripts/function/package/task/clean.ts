import {removeDistFolder} from "../removeDistFolder";

export const clean = async() => {

    // remove ./dist
    await removeDistFolder();
};