const chalk = require('chalk');
const spawn = require('cross-spawn');

const routerDependency = '@springtype/springtype-incubator-router';

export const enableRouter = async(): Promise<void> => {

    return new Promise((resolve, reject) => {

        console.log('Installing dependencies... This might take a couple of minutes.');

        const child = spawn('npm', ['install', routerDependency], { stdio: 'inherit' });

        child.on('close', (code: number) => {

            if (code !== 0) {

                console.error(
                    chalk.red(
                        `Error installing dependency ${chalk.green(
                            routerDependency
                        )}.`
                    )
                );
                reject(code);

            } else {

                console.log(`${chalk.green('Successfully enabled module: ')} ${chalk.cyan(routerDependency)}`);
                console.log('');
                console.log('Now you can head on to put:');
                console.log();
                console.log(`    ${chalk.gray('<st-router>')}`);
                console.log();
                console.log(`in a ${chalk.gray('render()')} method or ${chalk.gray('@Template(...)')} of your app to define where routed pages shall be displayed.`);
                console.log();
                console.log(`    ${chalk.gray('@Element("app-welcome-page")')}`);
                console.log(`    ${chalk.gray('@Route("/welcome")')}`);
                console.log('');
                console.log('tells SpringType which route belongs to what page (element).');
                console.log();

                resolve();
            }
        });
    });
};