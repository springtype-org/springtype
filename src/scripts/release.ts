import chalk from "chalk";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {getFilteredPackages} from "./function/package/getFilteredPackages";
import {chdirSync} from "./function/system/chdirSync";
import {spawnCmd} from "./function/system/spawnCmd";
import {release} from "./function/package/task/release";

(async() => {

    console.log(chalk.gray('You are here: '), chalk.gray(getAbsoluteCwd()));
    console.log(chalk.gray('Arguments:    '), getProgramArguments());

    const packageFilter = getProgramArguments()[0] || 'all';

    console.log();
    console.log(chalk.magenta(`=== RELEASE: ${packageFilter} ===`));

    // login to npm
    await spawnCmd('npm', ['login']);

    await forEachPackage(async(packageName: string) => {

        console.log();
        console.log(chalk.gray(`=== Releasing package: ${packageName} ===`));
        console.log();

        // cd packages/$packageName
        chdirToPackage(packageName);
        
        await release();

        // cd ../ back to package directory
        chdirSync('../');

        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done publishing: '), getFilteredPackages(packageFilter));
})();