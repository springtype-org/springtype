import {concatErrors} from "../../../function/concatErrors";

const spawn = require('cross-spawn');

export const installModules = async (root: string, dependencies: string[], devDependencies: string[]) => {
    await new Promise((resolve, reject) => {
        process.chdir(root);

        console.log();
        console.log('Installing dependencies...');

        const child = spawn('npm', ['install', ...dependencies], {stdio: 'inherit'});

        child.on('close', (code: number) => {

            if (code !== 0) {

                concatErrors([
                    'npm exited with error code: ' + code
                ]);
                reject(code);
            } else {
                resolve();
            }
        });
    });
    await new Promise((resolve, reject) => {
        process.chdir(root);

        console.log('Installing dev dependencies...');

        const child = spawn('npm', ['install', ...devDependencies, '--save-dev'], {stdio: 'inherit'});

        child.on('close', async (code: number) => {

            if (code !== 0) {

                concatErrors([
                    'npm exited with error code: ' + code
                ]);
                reject(code)
            }else {
                resolve()
            }
        });
    });

    return true;
};