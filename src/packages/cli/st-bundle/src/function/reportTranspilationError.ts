const chalk = require('chalk');
const path = require('path');

export const reportTranspilationError = (event: any) => {

    if (!event.error.name) event.error.name = 'ERROR';

    console.error(chalk.red(`${event.error.name}: Transpilation failed:`));
    console.error(chalk.gray('=============================='));
    console.error(event.error.frame);
    console.error(chalk.gray('=============================='));

    console.error(chalk.white('In file:'), chalk.green(`${event.error.loc.relativeFile}`), chalk.magenta(`${event.error.loc.line}:${event.error.loc.column}`));
};