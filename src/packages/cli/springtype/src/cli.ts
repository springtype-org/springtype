import {printHeader} from "./function/printHeader";
import registerCreateCommand from "./command/create/function/registerCreateCommand";

const commander = require('commander');
const envinfo = require('envinfo');
const chalk = require('chalk');
const packageJson = require('../package.json');

// always print the header first
printHeader();

if (process.argv.length < 3) {
    process.argv.push('--help')
}

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .option('--info', 'print environment debug info')
    .allowUnknownOption()
    .on('--help', () => {
        console.log();
        console.log(
            `    If you have any problems, do not hesitate to file an issue:`
        );
        console.log(
            `      ${chalk.cyan(packageJson.bugs.url)}`
        );
        console.log();
    });

(async() => {

    await registerCreateCommand(program);

    program.parse(process.argv);

    if (program.info) {

        console.log(chalk.bold('\nEnvironment Info:'));

        envinfo.run(
            {
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'npm', 'Yarn'],
                Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
                npmPackages: ['@springtype/core'],
                npmGlobalPackages: ['st-create'],
            },
            {
                duplicates: true,
                showNotFound: true,
            }
        )
        .then(console.log);
    }


})();