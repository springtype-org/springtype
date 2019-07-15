import {isSafeToCreateAppIn} from "./isSafeToCreateAppIn";

const fsx = require('fs-extra');
const chalk = require('chalk');

export const createProjectFolder = (projectPath: string, projectName: string): boolean => {

    fsx.ensureDirSync(projectPath);

    if (!isSafeToCreateAppIn(projectPath, projectName)) {
        return false;
    }

    console.log(`Creating a new SpringType project in ${chalk.green(projectPath)}.`);

    return true;
};