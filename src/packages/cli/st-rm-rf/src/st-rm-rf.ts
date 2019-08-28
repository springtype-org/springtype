const fs = require('fs');
const promisify = require('util').promisify;
const spawn = require("cross-spawn");
const os = require("os");

const fsp = {
    lstat: promisify(fs.lstat)
};

export const removePathOrFile = async (deletePath: string, printError: boolean = false): Promise<boolean> => {
    try {
        const platform = os.platform();
        if (platform === "win32") {
            const stat = await fsp.lstat(deletePath);
            if (stat.isDirectory()) {
                spawn.sync(process.env.comspec, ['/c','rmdir','/s', '/q', deletePath], {stdio: 'inherit'});
            } else {
                spawn.sync(process.env.comspec, ['/c', 'del', deletePath], {stdio: 'inherit'});
            }
            return true;
        } else {
            spawn.sync('rm', ['-rf', deletePath], {stdio: 'inherit'});
            return true;
        }
    } catch (err) {
        if (printError) {
            console.log(`Error removing: ${err}`);
        }
        return false;
    }
};
