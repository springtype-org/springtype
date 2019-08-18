import chalk from "chalk";
import {removePathOrFile} from "st-rm-rf";

export const removeDistFolder = async() => {

    console.log(chalk.cyan(`Removing:`), chalk.white('./dist'));
    await removePathOrFile('dist');
};