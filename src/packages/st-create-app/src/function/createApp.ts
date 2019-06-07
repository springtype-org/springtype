import {validateAppName} from "./validateAppName";

const path = require('path');
const spawn = require('cross-spawn');
const fs = require('fs-extra');
const os = require('os');
const chalk = require('chalk');

import {packageJsonTemplate} from "../templates/packageJsonTemplate";
import {tsConfigTemplate} from "../templates/tsConfigTemplate";
import {indexHtmlTemplate} from "../templates/indexHtmlTemplate";
import {dependencies} from "../definition/dependencies";
import {logErrors} from "./logErrors";
import {devDependencies} from "../definition/devDependencies";
import {isSafeToCreateAppIn} from "./isSafeToCreateAppIn";
import {createElement} from "../../../st-create-element/src/function/createElement";
import {printHeader} from "../../../cli-common/src/function/printHeader";
import {appElementTemplate} from "../templates/appElementTemplate";
import appElementStyleTemplate from "../templates/appElementStyleTemplate";

export const createApp = async(projectPath: string) => {

    return new Promise((resolve, reject) => {

        printHeader();

        const root = path.resolve(projectPath);
        const appName = path.basename(root);

        validateAppName(appName);
        fs.ensureDirSync(projectPath);

        if (!isSafeToCreateAppIn(root, projectPath)) {
            process.exit(1);
        }

        console.log(`Creating a new SpringType app in ${chalk.green(root)}.`);
        console.log();

        // write package.json
        fs.writeFileSync(
            path.join(root, 'package.json'),
            JSON.stringify(packageJsonTemplate(appName), null, 2) + os.EOL
        );

        // write tsconfig.json
        fs.writeFileSync(
            path.join(root, 'tsconfig.json'),
            JSON.stringify(tsConfigTemplate, null, 4) + os.EOL
        );

        fs.ensureDirSync(path.join(root, 'src'));
        fs.ensureDirSync(path.join(root, 'src', 'element'));
        fs.ensureDirSync(path.join(root, 'test'));

        // write index.html
        fs.writeFileSync(
            path.join(root, 'src', 'index.html'),
            indexHtmlTemplate(appName) + os.EOL
        );

        process.chdir(root);

        console.log('Installing dependencies... This might take a couple of minutes.');

        const child = spawn('npm', ['install', ...dependencies], { stdio: 'inherit' });

        child.on('close', (code: number) => {

            if (code !== 0) {

                logErrors([
                    'npm exited with error code: ' + code
                ]);
                reject(code);

            } else {

                const child = spawn('npm', ['install', ...devDependencies, '--save-dev'], { stdio: 'inherit' });

                child.on('close', async(code: number) => {

                    if (code !== 0) {

                        logErrors([
                            'npm exited with error code: ' + code
                        ]);
                        reject(code);

                    } else {

                        const elementName = appName + '-app';

                        // write $appName-app.tsx
                        await createElement(elementName, appElementTemplate(`src/element/${elementName}/${elementName}.tsx`), appElementStyleTemplate(elementName));

                        console.log(chalk.green('Thank you for choosing SpringType!'));
                        console.log('');
                        console.log('The project directory is:');
                        console.log('');
                        console.log(`    ${chalk.grey('cd ' + root)}`);
                        console.log('');
                        console.log('Run (and develop) your app via:');
                        console.log();
                        console.log(`    ${chalk.grey('npm start')}`);
                        console.log();
                        console.log('Create a production build (see ./dist folder) via:');
                        console.log();
                        console.log(`    ${chalk.grey('npm run build')}`);
                        console.log('');
                        console.log('And clean files cached while compilation:');
                        console.log();
                        console.log(`    ${chalk.grey('npm run clean')}`);
                        console.log('');
                        console.log('This is a very basic app example.');
                        console.log('You can enable more SpringType features with:');
                        console.log();
                        console.log(`    ${chalk.grey('npx st-enable')}`);
                        console.log();

                        console.log(chalk.green('Starting development server now...'));

                        spawn('npm', ['start'], { stdio: 'inherit' });

                        resolve();

                        /*
                        console.log('End-2-end test via (make sure the app is running!):');
                        console.log('');
                        console.log('    npm run e2e');
                        console.log('');
                        console.log('    In case you want to test a production build (prod. server on port 4567):');
                        console.log('');
                        console.log('    npm run e2e -- --port 4567');
                        console.log('');
                        console.log('Unit-test your app via:');
                        console.log('');
                        console.log('    npm test');
                        console.log('');
                         */
                        /*
                        console.log('');
                        console.log('If you need more features, check out the st-create-app guide:');
                        console.log('');
                        console.log('    https://www.springtype.org/docs/st-create-app');
                        console.log('');
                        console.log('But basically, you can just enable/disable features like that:');
                        console.log('');
                        console.log('    npx st-create-app enable routing');
                        console.log('');
                        console.log('Features available:');
                        console.log('');
                        console.log('    material-ui');
                        console.log('    routing');
                        console.log('    state');
                        console.log('    i18n');
                        console.log('    ssr');
                        console.log('    validate');
                        console.log('    test');
                        console.log('    e2e');
                        */

                    }
                });
            }
        });
    });
};
