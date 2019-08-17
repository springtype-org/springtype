#!/usr/bin/env node

import {processEntryHTMLFile} from "./function/task/processEntryHTMLFile";
import {AnalyzeEntryHTML} from "./function/entry-html/analyzeEntryHTML";
import {serveLive} from "./function/task/serveLive";
import {transpileAndWatch} from "./function/task/transpileAndWatch";

const commander = require('commander');
const path = require('path');
const chalk = require('chalk');
const packageJson = require('./package.json');
const fs = require('fs');

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .option('-p, --port <port>', 'set the HTTP port to listen on')
    .option('-o, --optimize', 'enable production optimizations')
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

program.parse(process.argv);

const opts = program.opts();
const args: Array<string> = process.argv.slice(2);
const entryHTMLFilePath = args[0];

if (!entryHTMLFilePath || !fs.existsSync(entryHTMLFilePath)) {
    console.error(chalk.red('Entry HTML file'), chalk.white(entryHTMLFilePath), chalk.red('does NOT exist. Exiting.'));
    process.exit(1);
}

const baseSourceFilesPath = path.dirname(entryHTMLFilePath);
const port = parseInt(opts.port, 10) || 8080;

(async() => {

    const analyzedEntryHTML: AnalyzeEntryHTML = await processEntryHTMLFile(entryHTMLFilePath);

    console.log(chalk.green('Starting server on port:'), chalk.magenta(port));

    const io = await serveLive(entryHTMLFilePath, port);

    console.log(chalk.green('Transpiling, entering *watch* mode...'));

    await transpileAndWatch(analyzedEntryHTML, baseSourceFilesPath, io, opts);

})();