#!/usr/bin/env node


const path = require('path');
const fs = require('fs');
const fss = fs.promises;
const chalk = require('chalk');

const removePathOrFile = async (deletePath: string): Promise<boolean> => {
    const stat = await fss.lstat(deletePath);
    if (stat.isDirectory()) {
        const deletePaths = await fss.readdir(deletePath);
        for (let i = 0; i < deletePaths.length; i++) {
            const _deletePath = deletePaths[i];
            await removePathOrFile(path.join(deletePath, _deletePath));
        }
        await fss.rmdir(deletePath);
    } else if (stat.isFile() || stat.isSymbolicLink()) {
        try {
            await fss.unlink(deletePath)
            //file removed
        } catch (err) {
            console.error(err);
            return false;
        }
    } else {
        console.log(`- error ${deletePath}`);
        return false;
    }
    return true;
};

const deletePaths = process.argv.slice(2);

(async () => {

    if (deletePaths.length == 0) {
        console.log(chalk.red('Nothing to delete.'));
        console.log(' - add paths as arguments');

    } else {
        console.log(chalk.green('Start deleting paths'));
        for (let i = 0; i < deletePaths.length; i++) {
            const deletePath = path.resolve(deletePaths[i]);
            try {
                await fss.access(deletePath);
                if (await removePathOrFile(deletePath)) {
                    console.log(chalk.cyan(`+ deleted ${deletePath}`))
                } else {
                    console.log(chalk.red(`- error  ${deletePath}`))
                }

            } catch (err) {
                console.log(`/ nothing ${deletePath}`)
            }
        }
    }
})();


