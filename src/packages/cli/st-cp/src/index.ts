#!/usr/bin/env node

import {filePathExist, copyPathOrFile} from "./st-cp";

const path = require('path');
const chalk = require('chalk');

const sourcePaths = process.argv.slice(2);

// removes the target path from the copyPaths and stores it in targetPath
const destinationPath = sourcePaths.pop() || '';

(async () => {

    if (sourcePaths.length == 0) {
        console.log(chalk.red('Nothing to copy.'));
        console.log(' - add paths as arguments');

    } else {
        console.log(chalk.green('Start copying paths'));

        for (let i = 0; i < sourcePaths.length; i++) {
            const sourcePath = path.resolve(sourcePaths[i]);
            if (await filePathExist(sourcePath)) {
                if (await copyPathOrFile(sourcePath, destinationPath, true)) {
                    console.log(chalk.cyan(`+ copied ${sourcePath} to `))
                } else {
                    console.log(chalk.red(`- error  ${sourcePath}`))
                }
            } else {
                console.log(`/ nothing ${sourcePath}`)
            }
        }
    }
})();


