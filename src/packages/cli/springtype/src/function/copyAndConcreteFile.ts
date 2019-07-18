import chalk from "chalk";
import {kebabToCamelCase} from "./kebabToCamelCase";
import {isProgramCodeFile} from "./humanReadableFiles";
import {join, relative, resolve} from "path"
import {mkdirSync, readFileSync, writeFileSync, copyFileSync} from "fs"

const TEMPLATE_LOWER_REGEX = /templatename/g;
const TEMPLATE_UPPER_REGEX = /TemplateName/g;

export interface CopyRenameReplaceFileOptions {
    filePath: string;
    templateFolderPath: string;
    projectPath: string;
    concreteName: string;
}

export const copyAndConcreteFile = (options: CopyRenameReplaceFileOptions) => {

    const fileName = relative(options.templateFolderPath, options.filePath)
        .replace(TEMPLATE_LOWER_REGEX, options.concreteName.toLocaleLowerCase())
        .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.concreteName));

    const newFilePath = join(options.projectPath, fileName);
    mkdirSync(resolve(newFilePath, '..'), {recursive: true});

    // whitelist
    if (isProgramCodeFile(options.filePath)) {
        const programCode = readFileSync(options.filePath, {encoding: 'utf8'})
            .replace(TEMPLATE_LOWER_REGEX, options.concreteName.toLocaleLowerCase())
            .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.concreteName));

        writeFileSync(newFilePath, programCode);
    } else {
        copyFileSync(options.filePath, newFilePath);
    }

    console.log(`- ${chalk.cyan(fileName)}`);
};
