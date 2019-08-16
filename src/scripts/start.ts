import chalk from "chalk";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {spawnCmd} from "./function/system/spawnCmd";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {getFilteredPackages} from "./function/package/getFilteredPackages";
import {getPackageJson} from "./function/package/getPackageJson";

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

        const packageJson = getPackageJson();

        if (!packageJson.bin) {
            throw new Error('There is no "bin" entry in package.json');
        }

        for (let binName in packageJson.bin) {

            if (packageJson.bin.hasOwnProperty(binName)) {

                await spawnCmd('node', [packageJson.bin[binName], ...process.argv.slice(3)]);
            }
        }
        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done starting: '), getFilteredPackages(packageFilter));

})();