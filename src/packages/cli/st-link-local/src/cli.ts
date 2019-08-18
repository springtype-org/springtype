#!/usr/bin/env node

import chalk from "chalk";
import {spawnCmd} from "./function/spawnCmd";
const path = require('path');
const fs = require('fs');

const packagesToInstall: Array<string> = process.argv.slice(2);

(async() => {

    console.log('CWD', process.cwd());

    process.chdir(process.cwd());

    if (packagesToInstall.length) {

        console.log();
        console.log(chalk.magenta(`=== PACKAGES TO INSTALL ===`));
        console.log();
        console.log(packagesToInstall);

        console.log();
        console.log(chalk.magenta(`=== INSTALLING ===`));
        console.log();

        await spawnCmd('yarn', ['add', ...packagesToInstall]);
    }

    console.log();
    console.log(chalk.magenta(`=== ANALYZING: package.json ===`));
    console.log();

    const localPackageJsonPath = path.resolve(process.cwd(), 'package.json');
    const localPackageJson = JSON.parse(fs.readFileSync(localPackageJsonPath, {
        encoding: 'utf8'
    }));

    const locallyLinkedDependencyPaths = [];

    if (localPackageJson.dependencies) {

        for (let packageName in localPackageJson.dependencies) {

            if (localPackageJson.dependencies.hasOwnProperty(packageName)) {
                const packageVersion = localPackageJson.dependencies[packageName];

                // found locally linked node dependency
                if (packageVersion.startsWith('file:') ||
                    packageVersion.startsWith('../')) {

                    locallyLinkedDependencyPaths.push(packageVersion);
                }
            }
        }
    }
    console.log('Found', locallyLinkedDependencyPaths.length, 'locally linked packages:');

    console.log(locallyLinkedDependencyPaths);

    if (locallyLinkedDependencyPaths.length) {

        console.log();
        console.log(chalk.magenta(`=== UPDATING ===`));
        console.log();

        await spawnCmd('yarn', ['add', ...locallyLinkedDependencyPaths]);

        console.log();
        console.log(chalk.magenta(`=== WATCHING (5 sec.) ===`));
        console.log();

        setInterval(async() => {

            await spawnCmd('yarn', ['add', ...locallyLinkedDependencyPaths]);

        }, 5000);

    } else {

        console.log('Nothing to do, exiting.');
    }

})();