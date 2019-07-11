import {validateProjectDirectoryInput} from "./function/validateProjectDirectoryInput";
import {printBanner} from "../../function/printBanner";
import {createProjectFolder} from "./function/createProjectFolder";
import {installModules} from "./action/installModules";
import {startApp} from "./action/startApp";
import {donationUrl} from "../../defenition/donationUrl";
import {copyTemplate} from "../action/copyTemplate";
import {Dirent} from "fs";
import {packageJsonTemplate} from "./template/packageJsonTemplate";

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

export async function createProject(executePath: string) {

    const templateFolderPath = path.resolve(__dirname, '../../template');

    const templates = fs.readdirSync(templateFolderPath, {withFileTypes: true})
        .filter((dirent: Dirent) => dirent.isDirectory())
        .map((dirent: Dirent) => dirent.name);

    const templateFolderChoice: { templateFolder: string } = await inquirer['prompt']([
        {
            type: 'list',
            choices: templates,
            name: 'templateFolder',
            default: 'simple',
            message: 'Please select template',
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
    const packageTplJSON: { dependencies: string[], devDependencies: string[] } = JSON.parse(fs.readFileSync(path.join(selectedTemplateFolderPath, 'package.tpl.json'), {encoding: 'utf8'}));

    if (copyTemplate(projectPath, selectedTemplateFolderPath, appName)) {
        const os = require('os');
        fs.writeFileSync(
            path.join(projectPath, 'package.json'),
            JSON.stringify(packageJsonTemplate(appName,templateFolderChoice.templateFolder), null, 2) + os.EOL
        );
    } else {
        return false;

    }

    if (!(await installModules(projectPath, packageTplJSON.dependencies, packageTplJSON.devDependencies))) {
        return false;
    }

    const packageJson: { homepage: string; bugs: { url: string } } =
        JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), {encoding: 'utf8'}));

    printBanner(packageJson.homepage, projectPath, packageJson.bugs.url, donationUrl);

    if (!(await startApp(projectPath))) {
        return false;
    }
}