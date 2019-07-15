import {copyAndConcreteFile} from "../../function/copyAndConcreteFile";

const fs = require('fs');

export const copyTemplate = (projectPath: string, templateFolderPath: string, concreteName: string): boolean => {

    console.log();
    console.log('creating files:');
    getFiles(templateFolderPath, (filePath: string) => copyAndConcreteFile({
        filePath,
        templateFolderPath,
        projectPath,
        concreteName
    }));

    return true;
};


const getFiles = (dir: string, fileDiscoveredCb: (filePath: string) => void) => {
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const path = dir + '/' + files[i];
        if (fs.statSync(path).isDirectory()) {
            getFiles(path, fileDiscoveredCb);
        } else {
            fileDiscoveredCb(path);
        }
    }
};

