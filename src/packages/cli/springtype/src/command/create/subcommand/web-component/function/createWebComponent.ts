import {getTemplatesFromFolder} from "../../../../../function/getTemplates";
import {validateWebComponentName} from "./validateWebComponentName";
import {copyTemplate} from "../../../action/copyTemplate";
import {donationUrl} from "../../../../../definition/donationUrl";
import {printFooter} from "./printFooter";
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const DEFAULT_COMPONENT_TEMPLATE_TYPE = 'scratch';

export async function createWebComponent(cwd: string) {

    const templateFolderPath = path.resolve(__dirname, '../../../../../template/web-component');
    const templates = getTemplatesFromFolder(templateFolderPath);

    const templateFolderChoice: { templateFolder: string } = await inquirer.prompt([
        {
            type: 'list',
            choices: templates,
            name: 'templateFolder',
            default: DEFAULT_COMPONENT_TEMPLATE_TYPE,
            message: 'Please select a template',
            filter: (val: string) => {
                return val.toLowerCase();
            }
        }
    ]);

    const selectedTemplateFolderPath = path.join(templateFolderPath, templateFolderChoice.templateFolder);

    // get Web Component tag name
    const choiceWebComponentTagName = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Please specify the Web Component tag name (e.g. ${chalk.cyan('my-side-menu')}):`,
            validate: validateWebComponentName
        }
    ]);

    const webComponentTagName = choiceWebComponentTagName.name;

    if (!copyTemplate(cwd, selectedTemplateFolderPath, webComponentTagName)) {
        return false;
    }

    const packageJson: { homepage: string; bugs: { url: string } } =
        JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../../../package.json'), {encoding: 'utf8'}));

    printFooter(packageJson.homepage, cwd, packageJson.bugs.url, donationUrl);
}