#!/usr/bin/env node


import {filePathExist, removePathOrFile} from "./st-rm-rf";

const path = require('path');
const chalk = require('chalk');

const deletePaths = process.argv.slice(2);

(async () => {

    if (deletePaths.length == 0) {
        console.log(chalk.red('Nothing to delete.'));
        console.log(' - add paths as arguments');

    } else {
        console.log(chalk.green('Start deleting paths'));
        for (let i = 0; i < deletePaths.length; i++) {
            const deletePath = path.resolve(deletePaths[i]);
            if (await filePathExist(deletePath)) {
                if (await removePathOrFile(deletePath, true)) {
                    console.log(chalk.cyan(`+ deleted ${deletePath}`))
                } else {
                    console.log(chalk.red(`- error  ${deletePath}`))
                }
            } else {
                console.log(`/ nothing ${deletePath}`)
            }
        }
    }
})();


