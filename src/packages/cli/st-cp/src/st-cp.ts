const process = require("child_process");
const os = require("os");

export const copyPathOrFile = async (sourcePath: string, destinationPath: string, printError: boolean = false): Promise<boolean> => {
    try {
        const platform = os.platform();
        if (platform === "win32") {
            process.execSync(`xcopy "${sourcePath}" "${destinationPath}" /O /X /E /H /K`);
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
