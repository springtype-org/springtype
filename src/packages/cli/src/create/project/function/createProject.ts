import {validateProjectDirectoryInput} from "./validateProjectDirectoryInput";
import {Dirent} from "fs";
import {createProjectFolder} from "./createProjectFolder";
import {copyTemplate} from "../../action/copyTemplate";
import {installModules} from "../action/installModules";
import {printBanner} from "../../../function/printBanner";
import {donationUrl} from "../../../definition/donationUrl";
import {startApp} from "../action/startApp";

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const DEFAULT_PROJECT_TEMPLATE_TYPE = 'scratch';

const transformPackageDependenciesToStrings = (packageJson: any, key: string): Array<string> => {

    const dependencies: Array<string> = [];
    for (let dependencyName in packageJson[key]) {
        dependencies.push(
            `${dependencyName}@${packageJson[key][dependencyName]}`
        )
    }
    return dependencies;
};

export async function createProject(executePath: string) {

    const templateFolderPath = path.resolve(__dirname, '../../../template/project');

    const templates = fs.readdirSync(templateFolderPath, {withFileTypes: true})
        .filter((directoryEntry: Dirent) => directoryEntry.isDirectory())
        .map((directoryEntry: Dirent) => directoryEntry.name);

    const templateFolderChoice: { templateFolder: string } = await inquirer['prompt']([
        {
            type: 'list',
            choices: templates,
            name: 'templateFolder',
            default: DEFAULT_PROJECT_TEMPLATE_TYPE,
            message: 'Please select a template',
            filter: (val: string) => {
                return val.toLowerCase();
            }
        }
    ]);

    const selectedTemplateFolderPath = path.join(templateFolderPath, templateFolderChoice.templateFolder);

    //get project directory name
    const choiceProjectName = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Please specify the project directory (${chalk.cyan('st-my-app')}):`,
            validate: validateProjectDirectoryInput
        }
    ]);

    const appName = choiceProjectName.name;
    const projectPath = path.join(executePath, appName);
    if (!createProjectFolder(projectPath, appName)) {
        return false;
    }
    const packageJSON: { dependencies: any, devDependencies: any } = JSON.parse(
        fs.readFileSync(path.join(selectedTemplateFolderPath, 'package.json'),{encoding: 'utf8'}
    ));

    const dependenciesAsString: Array<string> = transformPackageDependenciesToStrings(packageJSON, 'dependencies');
    const devDependenciesAsString: Array<string> = transformPackageDependenciesToStrings(packageJSON, 'devDependencies');

    if (!copyTemplate(projectPath, selectedTemplateFolderPath, appName)) {
        return false;
    }

    if (!(await installModules(projectPath, dependenciesAsString, devDependenciesAsString))) {
        return false;
    }

    const packageJson: { homepage: string; bugs: { url: string } } =
        JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../package.json'), {encoding: 'utf8'}));

    printBanner(packageJson.homepage, projectPath, packageJson.bugs.url, donationUrl);

    if (!(await startApp(projectPath))) {
        return false;
    }
}