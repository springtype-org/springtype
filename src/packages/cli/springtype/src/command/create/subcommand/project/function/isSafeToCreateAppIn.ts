import chalk from "chalk";
import {join} from "path";
import {readdirSync} from "fs";


import {logFiles} from "../definition/logFiles";
import {filesAllowedToResistInAppDir} from "../definition/filesAllowedToResistInAppDir";
import {removePathOrFile} from "st-rm-rf/dist/st-rm-rf";

export const isSafeToCreateAppIn = async (rootPath: string, name: string) => {
    console.log();
    const conflicts = readdirSync(rootPath)
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
    const currentFiles = readdirSync(join(rootPath));
    for (let i = 0; i < currentFiles.length; i++) {
        const file = currentFiles[i];
        if (logFiles.find((errorLogFilePattern: string) => file.indexOf(errorLogFilePattern) === 0)) {
            await removePathOrFile(join(rootPath, file));
        }
    }
    return true;
};