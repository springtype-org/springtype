import chalk from "chalk";
import {forEachPackage} from "./function/package/forEachPackage";
import {chdirToPackage} from "./function/package/chdirToPackage";
import {chdirToBaseDir} from "./function/system/chdirToBaseDir";
import {getAbsoluteCwd} from "./function/system/getAbsoluteCwd";
import {getProgramArguments} from "./function/system/getProgramArguments";
import {getFilteredPackages} from "./function/package/getFilteredPackages";
import {chdirSync} from "./function/system/chdirSync";
import {distDirectory} from "./definition/distDirectory";
import {getDistPackageJson} from "./function/package/getDistPackageJson";
import {writeDistPackageJson} from "./function/package/writeDistPackageJson";
import {writePackageJson} from "./function/package/writePackageJson";
import {getPackageJson} from "./function/package/getPackageJson";
import {rewriteDistLocalRelativeDependenciesByLastestNpmVersions} from "./function/package/rewriteDistLocalRelativeDependenciesByLastestNpmVersions";
import {spawnCmd} from "./function/system/spawnCmd";
const { Input } = require('enquirer');

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

        let distPackageJson = getDistPackageJson();
        const packageJson = getPackageJson();

        const versionChoice = await (new Input({
            message: 'Please choose a new semver version',
            initial: distPackageJson.version
        })).run();

        distPackageJson.version = versionChoice;
        packageJson.version = versionChoice;

        // remove outdated gitHead reference
        delete packageJson.gitHead;
        delete distPackageJson.gitHead;

        distPackageJson = rewriteDistLocalRelativeDependenciesByLastestNpmVersions(distPackageJson);

        // write ./dist/package.json
        writeDistPackageJson(distPackageJson);

        // write ./package.json
        writePackageJson(packageJson);

        // cd ./dist
        chdirSync(distDirectory);

        // publish package using npm
        await spawnCmd('npm', ['publish']);

        // cd ../ back to package directory
        chdirSync('../');

        // cd ../../
        chdirToBaseDir(packageName);

    }, packageFilter);

    console.log();
    console.log(chalk.gray('=== Done publishing: '), getFilteredPackages(packageFilter));
})();