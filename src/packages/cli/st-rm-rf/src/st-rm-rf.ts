const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

export const removePathOrFile = async (deletePath: string, printError: boolean = false): Promise<boolean> => {
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
