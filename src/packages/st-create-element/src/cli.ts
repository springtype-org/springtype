import {donationUrl} from "./definition/donationUrl";
import {createElement} from "./function/createElement";
import {printBanner} from "../../cli-common/src/function/printBanner";

const commander = require('commander');
const chalk = require('chalk');
const packageJson = require('../../../package.json');

let elementName: string|undefined = undefined;

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<element-name>')
    .usage(`${chalk.green('<element-name>')} [options]`)
    .action((name: string) => {
        elementName = name;
    })
    .allowUnknownOption()
    .on('--help', () => {
        console.log(`    Only ${chalk.green('<element-name>')} is required.`);
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

    if (typeof elementName === 'undefined') {

        console.error('Please specify the element name to create. It must contain a dash:');
        console.log(
            `  ${chalk.cyan(program.name())} ${chalk.green('<element-name>')}`
        );
        console.log();
        console.log('For example:');
        console.log(`  ${chalk.cyan(program.name())} ${chalk.green('myapp-home-page')}`);
        console.log();
        console.log(
            `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
        );
        process.exit(1);

    } else {

        await createElement(elementName);

        printBanner(packageJson.homepage, packageJson.bugs.url, donationUrl);
    }
})();
