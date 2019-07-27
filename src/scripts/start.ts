import chalk from "chalk";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {spawnCmd} from "./function/system/spawnCmd";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {getFilteredPackages} from "./function/package/getFilteredPackages";
import {distDirectory} from "./definition/distDirectory";
import {chdirSync} from "./function/system/chdirSync";

(async() => {

    console.log(chalk.gray('You are here: '), chalk.gray(getAbsoluteCwd()));
    console.log(chalk.gray('Arguments:    '), getProgramArguments());

    const packageFilter = getProgramArguments()[0] || 'all';

    console.log();
    console.log(chalk.magenta(`=== START: ${packageFilter} ===`));

    await forEachPackage(async (packageName: string) => {

        console.log();
        console.log(chalk.gray(`=== Starting package: ${packageName} ===`));
        console.log();

        // cd packages/$packageName
        chdirToPackage(packageName);

        // remove ./dist (clean)
        await spawnCmd('node', ['dist/index.js']);

        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done starting: '), getFilteredPackages(packageFilter));

})();