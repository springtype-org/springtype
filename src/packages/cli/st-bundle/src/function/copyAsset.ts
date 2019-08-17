const fs = require('fs');
const path = require('path');

export const copyAsset = async(sourcePath: string, destPath: string) => {

    const destPathDir = path.dirname(destPath);

    if (!fs.existsSync(destPathDir)) {
        fs.mkdirSync(destPathDir, { recursive: true });
    }

    if (!fs.existsSync(destPath)) {

        // copy file over if it doesn't already exist
        fs.copyFile(sourcePath, destPath, (err) => {
            if (err) throw err;
            //console.log('source.txt was copied to destination.txt');
        });
    }
};