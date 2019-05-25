import {installDependencies} from "../function/installDependencies";

const chalk = require('chalk');

const dependency = '@springtype/i18n';

export const enablei18n = async(): Promise<void> => {

    await installDependencies([dependency]);

    // TODO: create src/translation and put some translation files (de.json, en.json)

    console.log(`${chalk.green('Successfully enabled module: ')} ${chalk.cyan(dependency)}`);
    console.log('');
    console.log('Now you can head on and assign translations like that:');
    console.log();
    console.log(`    ${chalk.gray('import * as englishTranslations from "./translation/en.json";')}`);
    console.log(`    ${chalk.gray('@Translations("en", englishTranslations)')}`);
    console.log(`    ${chalk.gray('@UseElement(Translate)')}`);
    console.log();
    console.log(`to use the translations using translation elements:`);
    console.log();
    console.log(`    ${chalk.gray('<st-t key="page_not_found" values={{ siteUrl: document.location.hash }} />')}`);
    console.log();
    console.log(`or in functional style:`);
    console.log();
    console.log(`    ${chalk.gray('t("page_not_found", { siteUrl: document.location.hash })')}`);
    console.log();
};