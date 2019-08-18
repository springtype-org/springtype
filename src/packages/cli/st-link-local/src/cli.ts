#!/usr/bin/env node

import chalk from "chalk";
import {copyPathOrFile} from "st-cp";
import {removePathOrFile} from "st-rm-rf";
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

(async() => {

    console.log();
    console.log(chalk.magenta(`=== ANALYZING: package.json ===`));
    console.log();

    const localPackageJsonPath = path.resolve(process.cwd(), 'package.json');
    const localPackageJson = JSON.parse(fs.readFileSync(localPackageJsonPath, {
        encoding: 'utf8'
    }));

    const locallyLinkedDependencies = [];

    if (localPackageJson.stLinkLocalDependencies) {

        for (let packageName in localPackageJson.stLinkLocalDependencies) {

            if (localPackageJson.stLinkLocalDependencies.hasOwnProperty(packageName)) {
                const packageVersion = localPackageJson.stLinkLocalDependencies[packageName];

                if (packageVersion.indexOf('./') > -1) {
                    locallyLinkedDependencies.push({
                        version: packageVersion.replace('file:', ''),
                        name: packageName
                    });
                }
            }
        }
    }
    console.log('Found locally linked packages:');
    console.log(locallyLinkedDependencies);

    if (locallyLinkedDependencies.length) {

        console.log();
        console.log(chalk.magenta(`=== WATCHING FOR LOCALLY LINKED DEPENDENCY CHANGES ===`));
        console.log();

        const pathsToWatch = locallyLinkedDependencies.map(dep => path.resolve(dep.version) + '/**/*');

        console.log('Watching paths:', pathsToWatch);

        let timeout;

        chokidar.watch(pathsToWatch, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            ignoreInitial: false,
            followSymlinks: true,
            disableGlobbing: false,
            useFsEvents: true,
            usePolling: true,
            ignorePermissionErrors: true,
            awaitWriteFinish: {
                stabilityThreshold: 2000,
                pollInterval: 100
            },
        }).on('all', () => {

            clearTimeout(timeout);

            timeout = setTimeout(async() => {

                for (let i=0; i<locallyLinkedDependencies.length; i++) {

                    const dependency = locallyLinkedDependencies[i];

                    console.log('Syncing local dependency: ', chalk.cyan(dependency.name), '...');

                    const baseName = path.basename(`./node_modules/${dependency.name}`);

                    const destPath = path.resolve(`./node_modules/${dependency.name}`, '../');

                    if (!fs.existsSync(destPath)) {
                        fs.mkdirSync(destPath, {
                            recursive: true
                        })
                    }

                    const sourcePath = path.resolve(dependency.version);

                    await copyPathOrFile(sourcePath, destPath);

                    await removePathOrFile(path.resolve(destPath, baseName));

                    const finalSubDir = path.resolve(destPath, baseName);

                    fs.renameSync(
                        path.resolve(destPath, path.basename(sourcePath)),
                        finalSubDir
                    );

                    console.log(chalk.green('Done. Copied dependency code to: '));
                    console.log(chalk.cyan('./' + path.relative(process.cwd(), finalSubDir)));
                    console.log();
                }

            }, 250);
        });

    } else {

        console.log('Nothing to do, exiting.');
    }

})();