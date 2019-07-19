import {isSafeToCreateAppIn} from "./isSafeToCreateAppIn";
import {mkdirSync} from "fs"
import chalk from "chalk";

export const createProjectFolder = (projectPath: string, projectName: string): boolean => {

    mkdirSync(projectPath);

    if (!isSafeToCreateAppIn(projectPath, projectName)) {
        return false;
    }

    console.log(`Creating a new SpringType project in ${chalk.green(projectPath)}.`);

    return true;
};