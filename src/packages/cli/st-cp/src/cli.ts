#!/usr/bin/env node

import {copyPathOrFile} from "./st-cp";

const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

const sourcePaths = process.argv.slice(2);

// removes the target path from the copyPaths and stores it in targetPath
const destinationPath = sourcePaths.pop() || '';

(async () => {

    if (sourcePaths.length == 0) {

        console.log(chalk.red('Nothing to copy.'));

    } else {

        console.log(chalk.green('Start copying paths:'), sourcePaths);

        for (let i = 0; i < sourcePaths.length; i++) {

            const sourcePath = path.resolve(sourcePaths[i]);

            if (fs.existsSync(sourcePath)) {
                if (await copyPathOrFile(sourcePath, destinationPath, true)) {
                    console.log(chalk.cyan(`Copied ${chalk.white(sourcePath)} to ${chalk.white(destinationPath)}`))
                } else {
                    console.log(chalk.red(`Error copying: ${sourcePath}`))
                }
            }
        }
    }

})();


