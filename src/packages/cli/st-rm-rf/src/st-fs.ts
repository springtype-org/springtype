const path = require('path');
const fs = require('fs');
const fss = fs.promises;

export const removePathOrFile = async (deletePath: string, printError: boolean = false): Promise<boolean> => {


    const stat = await fss.lstat(deletePath);
    if (stat.isDirectory()) {
        const deletePaths = await fss.readdir(deletePath);
        for (let i = 0; i < deletePaths.length; i++) {
            const _deletePath = deletePaths[i];
            await removePathOrFile(path.join(deletePath, _deletePath));
        }
        await fss.rmdir(deletePath);
    } else if (stat.isFile() || stat.isSymbolicLink()) {
        try {
            await fss.unlink(deletePath)
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
        await fss.access(existFilePath);
        return true;
    } catch (err) {
        if (printError) {
            console.log(`- error ${err}`);
        }
    }
    return false;
};
