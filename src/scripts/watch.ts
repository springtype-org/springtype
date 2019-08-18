import chalk from "chalk";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {spawnCmd} from "./function/system/spawnCmd";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {finalizeDistFolder} from "./function/package/finalizeDistFolder";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {getFilteredPackages} from "./function/package/getFilteredPackages";

(async() => {

    console.log(chalk.gray('You are here: '), chalk.gray(getAbsoluteCwd()));
    console.log(chalk.gray('Arguments:    '), getProgramArguments());

    const packageFilter = getProgramArguments()[0] || 'all';

    console.log();
    console.log(chalk.magenta(`=== WATCH: ${packageFilter} ===`));

    await forEachPackage(async (packageName: string) => {

        console.log();
        console.log(chalk.gray(`=== Watching package: ${packageName} ===`));
        console.log();

        // cd packages/$packageName
        chdirToPackage(packageName);

        // remove ./dist
        await spawnCmd('npx', ['st-rm-rf', 'dist']);

        // first-time-build
        await spawnCmd('tsc', []);

        // finalize ./dist
        await finalizeDistFolder();

        // watch
        await spawnCmd('tsc', ['-w']);

        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done watching: '), getFilteredPackages(packageFilter));

})();