const chalk = require('chalk');

export const concatErrors =(results: string[]): string => {
    let result = '';
    if (typeof results !== 'undefined') {
        results.forEach(error => {
            result += '\n' + chalk.red(`  [!]  ${error}`);
        });
    }
    return result;
};