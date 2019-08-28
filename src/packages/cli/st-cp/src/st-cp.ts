const process = require("cross-spawn");
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
                process.execSync(`xcopy "${sourcePath}" "${destinationPath}" /O /X /E /H /K`);
            } else {
                process.execSync(`xcopy "${sourcePath}" "${destinationPath}"`);
            }

            return true;
        } else {
            process.execSync(`cp -rp "${sourcePath}" "${destinationPath}"`);
            return true;
        }
    } catch (err) {
        if (printError) {
            console.log(`- error ${err}`);
        }
        return false;
    }
};
