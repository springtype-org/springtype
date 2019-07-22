import chalk from "chalk";
const path = require('path');
const { execSync } = require('child_process');

export function createConfig() {

    const configTemplateFileName = 'st-monorepo.config.js';
    const templatePath = path.resolve(__dirname, '../../../../src/template', configTemplateFileName);
    const destinationPath = process.cwd();

    console.log(chalk.cyan('Creating'), chalk.bold(destinationPath + path.sep + configTemplateFileName));

    try {

        execSync(`npx st-cp "${templatePath}" "${destinationPath}"`);

        console.log(chalk.green('Done.'));

    } catch(err) {

        console.error(`- error ${err}`);
    }
}