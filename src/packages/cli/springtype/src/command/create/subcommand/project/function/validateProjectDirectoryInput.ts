import {concatErrors} from "../../../../../function/concatErrors";

const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const path = require('path');

export const validateProjectDirectoryInput = async (projectDirectory: string): Promise<boolean | string> => {

    if (!projectDirectory) {
        return `Could not create a project called ${chalk.red(`"${projectDirectory}"`)}:`
            + concatErrors(['empty project name'])
    }

    if (projectDirectory.startsWith('/')) {
        return `Could not create a project called ${chalk.red(`"${projectDirectory}"`)}:`
            + concatErrors(['use relative path'])
    }

    const root = path.resolve(projectDirectory);
    const appName = path.basename(root);
    const validationResult = validateProjectName(appName);

    if (!validationResult.validForNewPackages) {
        return `Could not create a project called ${chalk.red(`"${appName}"`)} because of npm naming restrictions:`
            + concatErrors(validationResult.errors)
            + concatErrors(validationResult.warnings);
    }

    return true;
};