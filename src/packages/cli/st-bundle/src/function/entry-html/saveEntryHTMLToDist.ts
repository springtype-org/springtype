import {getDestFilePath} from "../getDestFilePath";

const fs = require('fs');
const path = require('path');

export const saveEntryHTMLToDist = async(entryHTMLFilePath: string, indexHTMLSource: string) => {

    const outputDirName = path.resolve(getDestFilePath(path.dirname(entryHTMLFilePath)));

    if (!fs.existsSync(outputDirName)) {
        fs.mkdirSync(outputDirName, { recursive: true });
    }

    fs.writeFileSync(path.resolve(getDestFilePath(entryHTMLFilePath)), indexHTMLSource);
};