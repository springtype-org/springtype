const spawn = require("cross-spawn");
const os = require("os");
const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');

const fsp = {
    lstat: promisify(fs.lstat)
};

export const copyPathOrFile = async (sourcePath: string, destinationPath: string, printError: boolean = false): Promise<boolean> => {
    try {
        const platform = os.platform();
        if (platform === "win32") {
            //fix destination path for windows
            destinationPath = path.resolve(process.cwd(), destinationPath);
            const stat = await fsp.lstat(sourcePath);
            if (stat.isDirectory()) {
                spawn.sync(process.env.comspec, ['/c','xcopy', sourcePath, destinationPath, '/I', '/Y', '/E', '/H', '/K'], {stdio: 'inherit'});
            } else {
                spawn.sync(process.env.comspec, ['/c','xcopy', sourcePath, destinationPath + '*', '/Y'], {stdio: 'inherit'});
            }
            return true;
        } else {
            spawn.sync('cp', ['-rp', sourcePath, destinationPath], {stdio: 'inherit'});
            return true;
        }
    } catch (err) {
        if (printError) {
            console.log(`- error ${err}`);
        }
        return false;
    }
};
