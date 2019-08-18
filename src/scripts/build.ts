import chalk from "chalk";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {spawnCmd} from "./function/system/spawnCmd";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {getFilteredPackages} from "./function/package/getFilteredPackages";
import {finalizeDistFolder} from "./function/package/finalizeDistFolder";

(async() => {

    console.log(chalk.gray('You are here: '), chalk.gray(getAbsoluteCwd()));
    console.log(chalk.gray('Arguments:    '), getProgramArguments());

    const packageFilter = getProgramArguments()[0] || 'all';

    console.log();
    console.log(chalk.magenta(`=== BUILD: ${packageFilter} ===`));

    await forEachPackage(async (packageName: string) => {

        console.log();
        console.log(chalk.gray(`=== Building package: ${packageName} ===`));
        console.log();

        // cd packages/$packageName
        chdirToPackage(packageName);

        // remove ./dist (clean)
        await spawnCmd('npx', ['st-rm-rf', 'dist']);

        // build using typescript compiler
        await spawnCmd('tsc', []);

        // finalize the ./dist folder
        await finalizeDistFolder();

        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done building: '), getFilteredPackages(packageFilter));

})();