const chalk = require('chalk');

export const printBanner = (documentationUrl: string, issueUrl: string, donateUrl: string) => {

    console.log('If you are not familiar with the API right now, please head on to:');
    console.log(`${chalk.green(documentationUrl)}`);
    console.log();
    console.log('Have a lot of fun! :-)');
    console.log();
    console.log('If you find the API is counter-intuitive or buggy, please do not hesitate to file an issue at:');
    console.log(`${chalk.green(issueUrl)}`);
    console.log();
    console.log(chalk.yellow('We are highly motivated to deliver a *stellar* developer experience!'));
    console.log();
    console.log(`${chalk.magenta(chalk.bold('Love SpringType? Please donate at:'))}`);
    console.log(`${chalk.cyan(chalk.bold(donateUrl))}`);
    console.log();
};