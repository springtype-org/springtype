import chalk from "chalk";
import {kebabToCamelCase} from "./kebabToCamelCase";
import {isProgramCodeFile} from "./humanReadableFiles";

const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');

const TEMPLATE_LOWER_REGEX = /templatename/g;
const TEMPLATE_UPPER_REGEX = /TemplateName/g;

export interface CopyRenameReplaceFileOptions {
    filePath: string;
    templateFolderPath: string;
    projectPath: string;
    concreteName: string;
}

export const copyAndConcreteFile = (options: CopyRenameReplaceFileOptions) => {

    const fileName = path.relative(options.templateFolderPath, options.filePath)
        .replace(TEMPLATE_LOWER_REGEX, options.concreteName.toLocaleLowerCase())
        .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.concreteName));

    const newFilePath = path.join(options.projectPath, fileName);
    fs.mkdirSync(path.resolve(newFilePath, '..'), {recursive: true});

    // whitelist
    if (isProgramCodeFile(options.filePath)) {
        const programCode = fs.readFileSync(options.filePath, {encoding: 'utf8'})
            .replace(TEMPLATE_LOWER_REGEX, options.concreteName.toLocaleLowerCase())
            .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.concreteName));

        fs.writeFileSync(newFilePath, programCode);
    } else {
        fsx.copySync(options.filePath, newFilePath);
    }

    console.log(`- ${chalk.cyan(fileName)}`);
};
