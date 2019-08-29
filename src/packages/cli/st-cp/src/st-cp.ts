const childProcess = require("child_process");
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
            destinationPath = path.resolve(process.cwd(), destinationPath);
            const statOfSourcePath = await fsp.lstat(sourcePath);

            if (statOfSourcePath.isDirectory()) {

                if (fs.existsSync(destinationPath)) {

                    const statOfDestPath = await fsp.lstat(destinationPath);
                    if (statOfDestPath.isDirectory()) {
                        destinationPath += path.sep + path.basename(sourcePath);
                    }
                }
                childProcess.execSync(`(robocopy "${sourcePath}" "${destinationPath}" /MIR /NFL /NDL /NJH /NJS /nc /ns /np) ^& IF %ERRORLEVEL% LEQ 1 exit 0`, {stdio: 'inherit'});

            } else {

                if (!fs.existsSync(path.dirname(destinationPath))) {
                    fs.mkdirSync(path.dirname(destinationPath), {
                        recursive: true
                    });
                }

                if (fs.existsSync(destinationPath)) {

                    const statOfDestPath = await fsp.lstat(destinationPath);

                    if (statOfDestPath.isDirectory()) {
                        destinationPath += path.sep + path.basename(sourcePath);
                        fs.copyFileSync(sourcePath, destinationPath);
                    } else {
                        console.error('Destination file already exists (skipping): ', destinationPath);
                    }

                } else {
                    fs.copyFileSync(sourcePath, destinationPath);
                }
            }
            return true;
        } else {
            childProcess.execSync('cp', ['-rp', `"${sourcePath}"`, `"${destinationPath}"`], {stdio: 'inherit'});
            return true;
        }
    } catch (err) {
        if (printError) {
            console.log(`- error ${err}`);
        }
        return false;
    }
};
