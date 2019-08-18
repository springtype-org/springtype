import {spawnCmd} from "../../system/spawnCmd";

export const test = async() => {

    // run testcafe with headless chrome
    await spawnCmd('testcafe', ['chrome:headless', 'test/**/*.test.ts']);
};