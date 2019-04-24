import {enableFeature} from "./function/enableFeature";
import {printBanner} from "./function/printBanner";
import {donationUrl} from "./definition/donationUrl";

const commander = require('commander');
const chalk = require('chalk');
const packageJson = require('../package.json');

let featureName: string|undefined = undefined;

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<feature-name>')
    .usage(`${chalk.green('<feature-name>')} [options]`)
    .action((name: string) => {
        featureName = name;
    })
    .allowUnknownOption()
    .on('--help', () => {
        console.log(`    Only ${chalk.green('<feature-name>')} is required.`);
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

    if (typeof featureName === 'undefined') {

        console.error('Please specify the feature to enable:');
        console.log(
            `  ${chalk.cyan(program.name())} ${chalk.green('<feature-name>')}`
        );
        console.log();
        console.log('For example:');
        console.log(`  ${chalk.cyan(program.name())} ${chalk.green('routing')}`);
        console.log();
        console.log(
            `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
        );
        process.exit(1);

    } else {

        await enableFeature(featureName);

        printBanner(packageJson.homepage, packageJson.bugs.url, donationUrl);
    }
})();