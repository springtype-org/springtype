#!/usr/bin/env node

import {removePathOrFile} from "./st-rm-rf";

const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

const pathsToRemove = process.argv.slice(2);

(async () => {

    if (pathsToRemove.length == 0) {

        console.log(chalk.red('Nothing to remove.'));

    } else {

        console.log(chalk.green('Start deleting paths:', pathsToRemove));

        for (let i = 0; i < pathsToRemove.length; i++) {

            const pathToRemove = path.resolve(pathsToRemove[i]);

            if (fs.existsSync(pathToRemove)) {

                if (await removePathOrFile(pathToRemove, true)) {
                    console.log(chalk.cyan(`Removed:`), chalk.white(pathToRemove))
                } else {
                    console.log(chalk.red(`Error removing:  ${pathToRemove}`))
                }
            }
        }
    }
})();


