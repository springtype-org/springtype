import {validateProjectDirectoryInput} from "./function/validateProjectDirectoryInput";
import {createProjectFolder} from "./function/createProjectFolder";
import {copyTemplate} from "./function/copyTemplate";
import {installModules} from "./function/installModules";
import {startApp} from "./function/startApp";

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');

export const springTypeCorePackageDependency = '@springtype/core';

export const dependencies = [
    springTypeCorePackageDependency
];

export const devDependencies = [
    'cross-env',
    'parcel-bundler',
    'rimraf',
    'typescript'
];


export async function createApp(executePath: string) {

    //get project directory name
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Please specify the project directory (${chalk.cyan('st-my-app')}):`,
            validate: validateProjectDirectoryInput
        }
    ]);

    const appName = answer.name;
    const projectPath = path.join(executePath, appName);
    if (!createProjectFolder(projectPath, appName)) {
        return false;
    }

    if (!copyTemplate(projectPath, appName)) {
        return false;
    }

    if(!(await installModules(projectPath,dependencies,devDependencies))){
        return false;
    }

    if(!(await startApp(projectPath))){
        return false;
    }



}