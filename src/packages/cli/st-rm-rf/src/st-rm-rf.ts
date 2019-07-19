const path = require('path');
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


const defaultRemovePathOrFile = async (deletePath: string, printError: boolean = false): Promise<boolean> => {
    const stat = await fsp.lstat(deletePath);
    if (stat.isDirectory()) {
        const deletePaths = await fsp.readdir(deletePath);
        for (let i = 0; i < deletePaths.length; i++) {
            const _deletePath = deletePaths[i];
            await removePathOrFile(path.join(deletePath, _deletePath));
        }
        await fsp.rmdir(deletePath);
    } else if (stat.isFile() || stat.isSymbolicLink()) {
        try {
            await fsp.unlink(deletePath)
            //file removed
        } catch (err) {
            if (printError) {
                console.log(`- error ${err}`);
            }
            return false;
        }
    } else {
        console.log(`- error ${deletePath}`);
        return false;
    }
    return true;
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
    const platform = os.platform();
    try {
        switch (platform) {
            case "win32":
                const stat = await fsp.lstat(deletePath);
                if (stat.isDirectory()) {
                    process.execSync(`rmdir /s /q "${deletePath}"`);
                } else {
                    process.execSync(`del "${deletePath}"`);
                }
                return true;
            case "linux":
                process.execSync(`rm -rf "${deletePath}"`);
                return true;
            default:
                //unknown platform
                console.log(`Unsupported platform (${platform}) run default`);
                return await defaultRemovePathOrFile(deletePath, printError);
        }
    } catch (err) {
        if (printError) {
            console.log(`- error ${err}`);
        }
        return false;
    }
};
