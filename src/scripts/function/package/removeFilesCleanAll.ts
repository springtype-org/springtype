import chalk from "chalk";
import {removePathOrFile} from "st-rm-rf";
import {removeDistFolder} from "./removeDistFolder";

export const removeFilesCleanAll = async() => {

    await removeDistFolder();

    console.log(chalk.cyan(`Removing:`), chalk.white('./node_modules'));
    await removePathOrFile('node_modules');

    console.log(chalk.cyan(`Removing:`), chalk.white('./package-lock.json'));
    await removePathOrFile('package-lock.json');
};