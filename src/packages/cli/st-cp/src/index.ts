#!/usr/bin/env node

import {filePathExist, copyPathOrFile} from "./st-cp";

const path = require('path');
const chalk = require('chalk');

const copyPaths = process.argv.slice(2);

// removes the target path from the copyPaths and stores it in targetPath
const targetPath = copyPaths.pop() || '';

(async () => {

    if (copyPaths.length == 0) {
        console.log(chalk.red('Nothing to copy.'));
        console.log(' - add paths as arguments');

    } else {
        console.log(chalk.green('Start copying paths'));

        if (await filePathExist(targetPath)) {

            for (let i = 0; i < copyPaths.length; i++) {
                const copyPath = path.resolve(copyPaths[i]);
                if (await filePathExist(copyPath)) {
                    if (await copyPathOrFile(copyPath, targetPath, true)) {
                        console.log(chalk.cyan(`+ copied ${copyPath}`))
                    } else {
                        console.log(chalk.red(`- error  ${copyPath}`))
                    }
                } else {
                    console.log(`/ nothing ${copyPath}`)
                }
            }
        }
    }
})();


