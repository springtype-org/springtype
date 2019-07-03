import {packageJsonTemplate} from "../template/packageJsonTemplate";
import {kebabToCamelCase} from "../../../function/kebabToCamelCase";
import chalk from "chalk";

const path = require('path');

const os = require('os');
const fs = require('fs');

const templateLowerRegex = /templatename/g;
const templateUpperRegex = /TemplateName/g;

export const copyTemplate = (projectPath: string, appName: string): boolean => {
    fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJsonTemplate(appName), null, 2) + os.EOL
    );
    const templateFolder = path.resolve(__dirname, '../../../template');

    const copyRenameReplace = (filePath: string) => {
        const suffix = path.relative(templateFolder, filePath)
            .replace(templateLowerRegex, appName.toLocaleLowerCase())
            .replace(templateUpperRegex, kebabToCamelCase(appName));

        const content = fs.readFileSync(filePath, {encoding: 'utf8'})
            .replace(templateLowerRegex, appName.toLocaleLowerCase())
            .replace(templateUpperRegex, kebabToCamelCase(appName));

        const newFilePath = path.join(projectPath, suffix);

        fs.mkdirSync(path.resolve(newFilePath, '..'), {recursive: true});
        fs.writeFileSync(newFilePath, content);
        console.log(`- ${chalk.cyan(suffix)}`);
    };

    console.log();
    console.log('creating files:');
    getFiles(templateFolder, copyRenameReplace);
    return true;
};


const getFiles = (dir: string, fun: (filePath: string) => void) => {
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, fun);
        } else {
            fun(name);
        }
    }
}
