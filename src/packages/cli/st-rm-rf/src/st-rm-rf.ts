const fs = require('fs');
const promisify = require('util').promisify;
const process = require("child_process");
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
                process.execSync(`rmdir /s /q "${deletePath}"`);
            } else {
                process.execSync(`del "${deletePath}"`);
            }
            return true;
        } else {
            process.execSync(`rm -rf "${deletePath}"`);
            return true;
        }
    } catch (err) {
        if (printError) {
            console.log(`Error removing: ${err}`);
        }
        return false;
    }
};
