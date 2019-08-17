export const getEntryJSModuleFiles = (
    entryTypeScriptFiles: Array<string>,
    baseSourceFilesPath: string
): Array<string> => {

    const jsModuleFiles = [];

    entryTypeScriptFiles.forEach((typeScriptFile: string) => {
        jsModuleFiles.push(`${baseSourceFilesPath}/${typeScriptFile}`);
    });

    return jsModuleFiles;
};