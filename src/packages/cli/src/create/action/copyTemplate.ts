import {copyRenameReplaceFile} from "../../function/copyRenameReplaceFile";

const fs = require('fs');

export const copyTemplate = (projectPath: string, templateFolderPath: string, appName: string): boolean => {

    console.log();
    console.log('creating files:');
    getFiles(templateFolderPath, (filePath: string) => copyRenameReplaceFile({
        filePath: filePath,
        templateFolderPath: templateFolderPath,
        projectPath: projectPath,
        appName: appName
    }));

    return true;
};


const getFiles = (dir: string, fun: (filePath: string) => void) => {
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, fun);
        } else {
            fun(name);
        }
    }
};

