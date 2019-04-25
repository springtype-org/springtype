import {installDependencies} from "../function/installDependencies";

const chalk = require('chalk');

const dependency = '@springtype/springtype-incubator-router';

export const enableRouter = async(): Promise<void> => {

    await installDependencies([dependency]);

    console.log(`${chalk.green('Successfully enabled module: ')} ${chalk.cyan(dependency)}`);
    console.log('');
    console.log('Now you can head on and put:');
    console.log();
    console.log(`    ${chalk.gray('<st-router>')}`);
    console.log();
    console.log(`in a root element of your app to define where routed pages shall be displayed.`);
    console.log();
    console.log(`    ${chalk.gray('@Element("app-welcome-page")')}`);
    console.log(`    ${chalk.gray('@Route("/welcome")')}`);
    console.log('');
    console.log('@Route added to a page element tells SpringType which route belongs to what page.');
    console.log();
};