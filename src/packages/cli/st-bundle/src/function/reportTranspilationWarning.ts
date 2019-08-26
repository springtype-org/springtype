const chalk = require('chalk');

export const reportTranspilationWarning = (event: any, io: any) => {

    console.warn();
    console.warn(chalk.yellow(`*** ${event.code} ***`));
    console.warn();
    console.warn(chalk.yellow(event.message));

    io.emit('bundle-warning', event);
};