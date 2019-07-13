import {Dirent} from "fs";
const fs = require('fs');

export const getTemplatesFromFolder = (templateFolderPath: string): Array<string> => {

    return fs.readdirSync(templateFolderPath, {withFileTypes: true})
        .filter((directoryEntry: Dirent) => directoryEntry.isDirectory())
        .map((directoryEntry: Dirent) => directoryEntry.name);
};