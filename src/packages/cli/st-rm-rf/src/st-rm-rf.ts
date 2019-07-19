const fs = require('fs');
const promisify = require('util').promisify;
const process = require("child_process");
const os = require("os");

const fsp = {
    lstat: promisify(fs.lstat),
    readdir: promisify(fs.readdir),
    rmdir: promisify(fs.rmdir),
    unlink: promisify(fs.unlink),
    access: promisify(fs.access),
};

export const filePathExist = async (existFilePath: string, printError: boolean = false): Promise<boolean> => {
    try {
        await fsp.access(existFilePath);
        return true;
    } catch (err) {
        if (printError) {
            console.log(`- error ${err}`);
        }
    }
    return false;
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
            console.log(`- error ${err}`);
        }
        return false;
    }
};
