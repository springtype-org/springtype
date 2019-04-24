import {getAppName} from "./function/getAppName";
import {createApp} from "./function/createApp";
import {printBanner} from "./function/printBanner";
import {donationUrl} from "./definition/donationUrl";

const commander = require('commander');
const envinfo = require('envinfo');
const chalk = require('chalk');
const packageJson = require('../package.json');

let projectPath: string|undefined = undefined;
let projectName: string|undefined = undefined;

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action((name: string) => {
        projectPath = name;
        projectName = getAppName(projectPath);
    })
    .option('--info', 'print environment debug info')
    .allowUnknownOption()
    .on('--help', () => {
        console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
        console.log();
        console.log(
            `    If you have any problems, do not hesitate to file an issue:`
        );
        console.log(
            `      ${chalk.cyan(packageJson.bugs.url)}`
        );
        console.log();
    })
    .parse(process.argv);

(async() => {

    if (program.info) {

        console.log(chalk.bold('\nEnvironment Info:'));

        envinfo.run(
            {
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'npm', 'Yarn'],
                Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
                npmPackages: ['react', 'react-dom', 'react-scripts'],
                npmGlobalPackages: ['st-create-app', 'st-create-element'],
            },
            {
                duplicates: true,
                showNotFound: true,
            }
        )
            .then(console.log);
    }

    if (typeof projectPath === 'undefined') {

        console.error('Please specify the project directory:');
        console.log(
            `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
        );
        console.log();
        console.log('For example:');
        console.log(`  ${chalk.cyan(program.name())} ${chalk.green('st-my-app')}`);
        console.log();
        console.log(
            `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
        );
        process.exit(1);

    } else {

        await createApp(projectPath);

        printBanner(packageJson.homepage, packageJson.bugs.url, donationUrl);
    }

})();
