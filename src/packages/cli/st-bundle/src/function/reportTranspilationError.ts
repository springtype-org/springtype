const chalk = require('chalk');
const path = require('path');
const stripAnsi = require('strip-ansi');

export const reportTranspilationError = (event: any, io: any) => {

    console.error();
    console.error(chalk.bgRed(`*** ${event.code} ***`));
    console.error();
    console.error(chalk.red(event.error));

    if (event.error.loc && event.error.frame) {

        if (!event.error.name) event.error.name = 'ERROR';

        if (event.error.loc) {
            event.error.loc.relativeFile = './' + path.relative(process.cwd(), event.error.loc.file);
        }
        event.error.plainFrame = stripAnsi(event.error.frame);

        console.error(chalk.gray('====='));
        console.error(event.error.frame);
        console.error(chalk.gray('====='));

        console.error(chalk.white('File:'), chalk.green(`${event.error.loc.relativeFile}`), chalk.magenta(`Line: ${event.error.loc.line} Column: ${event.error.loc.column}`));
    }

    io.emit('bundle-error', event);
};