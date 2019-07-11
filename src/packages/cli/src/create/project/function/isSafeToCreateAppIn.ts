const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

import {logFiles} from "../definition/logFiles";
import {filesAllowedToResistInAppDir} from "../definition/filesAllowedToResistInAppDir";

export const isSafeToCreateAppIn = (rootPath: string, name: string) => {
    console.log();
    const conflicts = fs
        .readdirSync(rootPath)
        .filter((file: string) => !filesAllowedToResistInAppDir.includes(file))
        // IntelliJ IDEA creates module files before CRA is launched
        .filter((file: string) => !/\.iml$/.test(file))
        // Don't treat log files from previous installation as conflicts
        .filter(
            (file: string) => !logFiles.some(pattern => file.indexOf(pattern) === 0)
        );

    if (conflicts.length > 0) {
        console.log(
            `The directory ${chalk.green(name)} contains files that could conflict:`
        );
        console.log();
        for (const file of conflicts) {
            console.log(`  ${file}`);
        }
        console.log();
        console.log(
            'Either try using a new directory name, or remove the files listed above.'
        );

        return false;
    }

    // Remove any remnant files from a previous installation
    const currentFiles = fs.readdirSync(path.join(rootPath));
    currentFiles.forEach((file: string) => {
        logFiles.forEach(errorLogFilePattern => {
            // This will catch `(npm-debug|yarn-error|yarn-debug).log*` files
            if (file.indexOf(errorLogFilePattern) === 0) {
                fs.removeSync(path.join(rootPath, file));
            }
        });
    });
    return true;
};