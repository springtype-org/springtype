import chalk from "chalk";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {spawnCmd} from "./function/system/spawnCmd";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {getFilteredPackages} from "./function/package/getFilteredPackages";

(async() => {

    console.log(chalk.gray('You are here: '), chalk.gray(getAbsoluteCwd()));
    console.log(chalk.gray('Arguments:    '), getProgramArguments());

    const packageFilter = getProgramArguments()[0] || 'all';

    console.log();
    console.log(chalk.magenta(`=== TEST: ${packageFilter} ===`));

    await forEachPackage(async (packageName: string) => {

        console.log();
        console.log(chalk.gray(`=== Testing package: ${packageName} ===`));
        console.log();

        // cd packages/$packageName
        chdirToPackage(packageName);

        // remove ./dist (clean)
        await spawnCmd('testcafe', ['chrome:headless', 'test/**/*.test.ts']);

        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done testing: '), getFilteredPackages(packageFilter));

})();