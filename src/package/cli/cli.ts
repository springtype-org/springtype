import 'colors';

export interface IArgv {
    [optionName: string]: Array<string>|string;
}

const argv = require('optimist').argv,
    path = require('path'),
    subCmd = argv['_'][1],
    fs = require('fs'),
    prompt = require('prompt');

export class Cli {

    private parseCommand(): string {

        return argv['_'][0];
    }

    private determineCurrentWorkingDirectory(): void {

        let cwd: string = process.cwd();

        // when -c is given
        if (argv['c']) {
            cwd = path.resolve(cwd, argv['c']);

            try {
                // change cwd
                process.chdir(cwd);
            } catch(e) {

                console.error('[!!] Cannot change to non-existing directory: ', cwd);
                process.exit(1);
            }
        }
    }

    run() {

        const cmd = this.parseCommand();

        this.determineCurrentWorkingDirectory();

        switch(cmd) {

            // TODO

            default:
                this.printHelp(cmd);
        }
    }

    private printHelp(cmd: string) {

        console.log('');
        console.log('SpringType CLI');
        console.log('');

        if (cmd !== 'help' && typeof cmd !== 'undefined') {
            console.log(`[!!] Command ${cmd} not found.`.red);
            console.log('');
        }

        console.log('Lists of commands available:');
        console.log('');
        console.log('  help         Prints this help message');
        console.log('');

        console.log('Lists of options available:');
        console.log('');
        console.log('  -c           Changes the current working directory to the dir named');
    }
}