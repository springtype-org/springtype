const chalk = require('chalk');

export const logErrors = (results: Array<string>) => {

    if (typeof results !== 'undefined') {

        results.forEach(error => {
            console.error(chalk.red(`  [!]  ${error}`));
        });
    }
};