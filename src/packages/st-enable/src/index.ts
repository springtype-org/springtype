#!/usr/bin/env node

(() => {

    const chalk = require('chalk');
    const currentNodeVersion = process.versions.node;
    const semver = currentNodeVersion.split('.');
    const major = parseInt(semver[0]);

    if (major < 10) {

        console.error(
            chalk.red(
                'You are running Node ' +
                currentNodeVersion +
                '.\n' +
                'st-create-app requires Node 10 or higher. \n' +
                'Please update your version of Node.'
            )
        );

        process.exit(1);
    }

    require('./cli');
})();