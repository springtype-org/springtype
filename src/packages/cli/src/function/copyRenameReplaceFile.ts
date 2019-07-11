import chalk from "chalk";
import {kebabToCamelCase} from "./kebabToCamelCase";
import {isHumanReadableFile} from "./humanReadableFiles";
import {ignoreFile} from "./ignoreFile";

const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');

const TEMPLATE_LOWER_REGEX = /templatename/g;
const TEMPLATE_UPPER_REGEX = /TemplateName/g;


export interface CopyRenameReplaceFileOptions {
    filePath: string;
    templateFolderPath: string;
    projectPath: string;
    appName: string;
}

export const copyRenameReplaceFile = (options: CopyRenameReplaceFileOptions) => {
    if(ignoreFile(options.filePath)){
        return;
    }
    const fileName = path.relative(options.templateFolderPath, options.filePath)
        .replace(TEMPLATE_LOWER_REGEX, options.appName.toLocaleLowerCase())
        .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.appName));

    const newFilePath = path.join(options.projectPath, fileName);
    fs.mkdirSync(path.resolve(newFilePath, '..'), {recursive: true});

    if (isHumanReadableFile(options.filePath)) {
        const content = fs.readFileSync(options.filePath, {encoding: 'utf8'})
            .replace(TEMPLATE_LOWER_REGEX, options.appName.toLocaleLowerCase())
            .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.appName));

        fs.writeFileSync(newFilePath, content);
    } else {
        fsx.copySync(options.filePath, newFilePath);
    }
    console.log(`- ${chalk.cyan(fileName)}`);
};
