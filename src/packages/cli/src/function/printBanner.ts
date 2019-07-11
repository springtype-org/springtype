const chalk = require('chalk');

export const printBanner = (documentationUrl: string, projectPath: string, issueUrl: string, donateUrl: string) => {
    console.log(chalk.green('Thank you for choosing SpringType!'));
    console.log('');
    console.log('If you are not familiar with the API right now, please head on to: 👩‍💻👨‍💻');
    console.log(`${chalk.green(documentationUrl)}`);
    console.log('');
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
    console.log('');
    console.log('The project directory is:');
    console.log('');
    console.log(`    ${chalk.grey('cd ' + projectPath)}`);
    console.log('');
    console.log('Run (and develop) your app via:');
    console.log();
    console.log(`    ${chalk.grey('npm start')}`);
    console.log();
    console.log('Create a production build (see ./dist folder) via:');
    console.log();
    console.log(`    ${chalk.grey('npm run build')}`);
    console.log('');
    console.log('And clean files cached while compilation:');
    console.log();
    console.log(`    ${chalk.grey('npm run clean')}`);
    console.log('');
    console.log(chalk.green('Starting development server now...'));
};


