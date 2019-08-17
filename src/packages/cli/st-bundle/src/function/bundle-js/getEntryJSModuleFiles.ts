import {getCacheFilePath} from "../getCacheFilePath";
import {renameTypeScriptFilesToJS} from "../renameTypeScriptFilesToJS";

export const getEntryJSModuleFiles = (
    entryTypeScriptFiles: Array<string>,
    baseSourceFilesPath: string
): Array<string> => {

    const jsModuleFiles = [];

    entryTypeScriptFiles.forEach((typeScriptFile: string) => {

        jsModuleFiles.push(getCacheFilePath(
`${baseSourceFilesPath}/${renameTypeScriptFilesToJS(typeScriptFile)}`
        ));
    });

    return jsModuleFiles;
};