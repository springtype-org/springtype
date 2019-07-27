import chalk from "chalk";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {spawnCmd} from "./function/system/spawnCmd";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {getFilteredPackages} from "./function/package/getFilteredPackages";
import {filesToCopyToDistDir} from "./definition/build/filesToCopyToDistDir";
import {distDirectory} from "./definition/distDirectory";
import {getDistPackageJson} from "./function/package/getDistPackageJson";
import {writeDistPackageJson} from "./function/package/writeDistPackageJson";
import {rewriteDistSubFolderReferences} from "./function/package/rewriteDistSubFolderReferences";

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

        // copy files like LICENSE.md and package.json to ./dist
        await spawnCmd('npx', ['st-cp', ...filesToCopyToDistDir, distDirectory]);

        // re-write fields "main", "bin", "types" so that they point to the right files (./ not ./dist)
        let packageJson = rewriteDistSubFolderReferences(getDistPackageJson());

        // write-out ./dist/package.json with re-written fields "main", "bin", "types"
        writeDistPackageJson(packageJson);

        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done building: '), getFilteredPackages(packageFilter));

})();