const chalk = require('chalk');
const spawn = require('cross-spawn');

export const installDependencies = async(dependencies: Array<string>): Promise<void> => {

    return new Promise((resolve, reject) => {

        console.log('Installing dependencies... This might take a couple of minutes.');

        const child = spawn('npm', ['install', ...dependencies], { stdio: 'inherit' });

        child.on('close', (code: number) => {

            const dependenciesList = dependencies.join(' ');

            if (code !== 0) {

                console.error(
                    chalk.red(`Error installing dependency ${chalk.green(dependenciesList)}.`)
                );
                reject(code);

            } else {

                resolve();
            }
        });
    });

};