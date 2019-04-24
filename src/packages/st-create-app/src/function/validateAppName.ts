import {logErrors} from "./logErrors";
import {dependencies} from "../definition/dependencies";
import {devDependencies} from "../definition/devDependencies";
const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');

export const validateAppName = (appName: string) => {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.error(
            `Could not create a project called ${chalk.red(
                `"${appName}"`
            )} because of npm naming restrictions:`
        );
        logErrors(validationResult.errors);
        logErrors(validationResult.warnings);
        process.exit(1);
    }

    const dependsOn = [...dependencies, ...devDependencies].sort();

    if (dependsOn.indexOf(appName) >= 0) {
        console.error(
            chalk.red(
                `We cannot create a project called ${chalk.green(
                    appName
                )} because a dependency with the same name exists.\n` +
                `Due to the way npm works, the following names are not allowed:\n\n`
            ) +
            chalk.cyan(dependsOn.map(depName => `  ${depName}`).join('\n')) +
            chalk.red('\n\nPlease choose a different project name.')
        );
        process.exit(1);
    }
};