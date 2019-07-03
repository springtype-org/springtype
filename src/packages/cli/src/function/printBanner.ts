const chalk = require('chalk');

export const printBanner = (documentationUrl: string, issueUrl: string, donateUrl: string) => {
    console.log('If you are not familiar with the API right now, please head on to: 👩‍💻👨‍💻');
    console.log(`${chalk.green(documentationUrl)}`);
    console.log();
    console.log('Have a lot of fun! 🤩');
    console.log();
    console.log('If we did a mistake and you find the API is counter-intuitive or buggy 🧐, ');
    console.log('please do not hesitate to file an issue 💩:');
    console.log(`${chalk.green(issueUrl)}`);
    console.log();
    console.log(chalk.yellow('🚀 We are highly motivated to deliver a *stellar* developer experience! 🚀'));
    console.log();
    console.log(`${chalk.magenta(chalk.bold('💰 Love SpringType? Please become a Patreon 💰'))}`);
    console.log(`💰 ${chalk.cyan(chalk.bold(donateUrl))} 💰`);
    console.log();
};