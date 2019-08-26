import chalk from "chalk";
import {filesToCopyToDistDir} from "../../definition/build/filesToCopyToDistDir";
import {distDirectory} from "../../definition/distDirectory";
import {rewriteDistSubFolderReferences} from "./rewriteDistSubFolderReferences";
import {getDistPackageJson} from "./getDistPackageJson";
import {writeDistPackageJson} from "./writeDistPackageJson";
import {copyPathOrFile} from "st-cp";
const fs = require('fs');

export const finalizeDistFolder = async() => {

    console.log();
    console.log(chalk.gray(`=== Finalizing ./dist ===`));
    console.log();

    // copy files like LICENSE.md and package.json to ./dist
    for (let i=0; i<filesToCopyToDistDir.length; i++) {

        console.log(chalk.cyan(`Copying ${chalk.white(filesToCopyToDistDir[i])} to ${chalk.white(distDirectory)}`));
        await copyPathOrFile(filesToCopyToDistDir[i], distDirectory);
    }

    // re-write fields "main", "bin", "types" so that they point to the right files (./ not ./dist)
    let packageJson = rewriteDistSubFolderReferences(getDistPackageJson());

    // write-out ./dist/package.json with re-written fields "main", "bin", "types"
    writeDistPackageJson(packageJson);

    // if bundled dependencies are found, copy them over to ./dist so they can be bundled
    if (packageJson['bundledDependencies']) {

        console.log();
        console.log(chalk.gray('=== Preparing bundled dependencies (bundledDependencies) ==='));
        console.log();

        for (let i=0; i<packageJson['bundledDependencies'].length; i++) {

            const targetDirectory = 'dist/node_modules/' + packageJson['bundledDependencies'][i];

            if (!fs.existsSync(targetDirectory)) {
                fs.mkdirSync(targetDirectory, {
                    recursive: true
                });
            }

            let targetDirectoryParentParts = targetDirectory.split('/');
            targetDirectoryParentParts.pop();
            const targetDirectoryParent = targetDirectoryParentParts.join('/');

            const bundledDependencyPath = './node_modules/' + packageJson['bundledDependencies'][i];

            console.log(chalk.cyan(`Copying ${chalk.white(bundledDependencyPath)} to ${chalk.white(targetDirectoryParent)}`));

            await copyPathOrFile(bundledDependencyPath, targetDirectoryParent);
        }
    }

    // bundle custom folders
    if (packageJson['stBundleFiles'] &&
        Array.isArray(packageJson['stBundleFiles'])) {


        console.log();
        console.log(chalk.gray('=== Preparing bundled files (stBundleFiles) ==='));
        console.log();

        for (let i=0; i<packageJson['stBundleFiles'].length; i++) {

            console.log(chalk.cyan(`Copying ${chalk.white(packageJson['stBundleFiles'][i])} to ${chalk.white('./dist')}`));
            await copyPathOrFile(packageJson['stBundleFiles'][i], 'dist');
        }
    }

    console.log();
    console.log(chalk.gray(`=== Done finalizing ./dist ===`));
    console.log();
};