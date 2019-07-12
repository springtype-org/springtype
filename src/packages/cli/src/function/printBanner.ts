const chalk = require('chalk');

export const printBanner = (documentationUrl: string, projectPath: string, issueUrl: string, donateUrl: string) => {
    console.log(chalk.green('Thank you for choosing SpringType!'));
    console.log('');
    console.log('If you are unfamiliar with SpringType, please head on to: 👩‍💻👨‍💻');
    console.log(`${chalk.green(documentationUrl)}`);
    console.log('');
    console.log('We hope you\'ll have the same fun using it as we had creating it! 🤩');
    console.log();
    console.log('But in case this isn\'t the case, if you find SpringType is counter-intuitive or buggy atm 🧐, ');
    console.log('please file an issue 💩 so we can improve asap:');
    console.log(`${chalk.green(issueUrl)}`);
    console.log();
    console.log(chalk.yellow('🚀 We are highly motivated to deliver a *stellar* developer experience! 🚀'));
    console.log();
    console.log(`${chalk.magenta(chalk.bold('💰 Love SpringType? Please become a Patreon and help SpringType spread... :) 💰'))}`);
    console.log(`💰 ${chalk.cyan(chalk.bold(donateUrl))} 💰`);
    console.log('');
    console.log('The project directory is:');
    console.log('');
    console.log(`    ${chalk.greenBright('cd ' + projectPath)}`);
    console.log('');
    console.log('Run (and develop) your app via:');
    console.log();
    console.log(`    ${chalk.greenBright('npm start')}`);
    console.log();
    console.log('Create a production build (see ./dist folder) via:');
    console.log();
    console.log(`    ${chalk.greenBright('npm run build')}`);
    console.log('');
    console.log('And clean files cached while compilation:');
    console.log();
    console.log(`    ${chalk.greenBright('npm run clean')}`);
    console.log('');
    console.log(chalk.green('Starting development server now...'));
};


