const spawn = require("cross-spawn");
const os = require("os");
const fs = require('fs');
const promisify = require('util').promisify;

const fsp = {
    lstat: promisify(fs.lstat)
};

export const copyPathOrFile = async (sourcePath: string, destinationPath: string, printError: boolean = false): Promise<boolean> => {
    try {
        const platform = os.platform();
        if (platform === "win32") {
            const stat = await fsp.lstat(sourcePath);
            if (stat.isDirectory()) {
                spawn.sync('xcopy', [sourcePath, destinationPath, '/O', '/X', '/E', '/H', '/K'], { stdio: 'inherit' });
            } else {
                spawn.sync('xcopy', [sourcePath, destinationPath], { stdio: 'inherit' });
            }
            return true;
        } else {
            spawn.sync('cp', ['-rp', sourcePath, destinationPath], { stdio: 'inherit' });
            return true;
        }
    } catch (err) {
        if (printError) {
            console.log(`- error ${err}`);
        }
        return false;
    }
};
