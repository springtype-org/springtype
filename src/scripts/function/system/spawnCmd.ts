import chalk from "chalk";
const { spawn } = require('cross-spawn');

export function spawnCmd(cmd, args: Array<string> = []): Promise<void> {

    return new Promise<void>((resolve, reject) => {

        console.log(chalk.green('>'), chalk.white(`${cmd} ${args.join(' ')}`));

        const shell = spawn(cmd, args, { stdio: 'inherit' });

        shell.on('close',(code) => {

            if (parseInt(code) !== 0) {
                reject();
            } else {
                resolve();
            }
        });
    });
}