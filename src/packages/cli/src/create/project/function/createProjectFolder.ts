import {isSafeToCreateAppIn} from "./isSafeToCreateAppIn";

const fs = require('fs');
const chalk = require('chalk');

export const createProjectFolder = (projectPath: string, projectName: string): boolean => {
    const exist = fs.existsSync(projectPath);
    if (!exist) {
        fs.mkdirSync(projectPath, {recursive: true});
    } else {
        if (!isSafeToCreateAppIn(projectPath, projectName)) {
            return false;
        }
    }
    console.log(`Creating a new SpringType app in ${chalk.green(projectPath)}.`);
    return true;
};