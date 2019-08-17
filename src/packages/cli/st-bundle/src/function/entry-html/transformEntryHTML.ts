import {renameTypeScriptFilesToJS} from "../renameTypeScriptFilesToJS";

export const transformEntryHTML = (
    entryHTMLSource: string,
    entryTypeScriptFiles: Array<string>
) => {

    // replace TypeScript module source references by JavaScript bundle module references
    entryTypeScriptFiles.forEach((entryTypeScriptFile: string) => {

        entryHTMLSource = entryHTMLSource.replace(
            entryTypeScriptFile,
            renameTypeScriptFilesToJS(entryTypeScriptFile)
        );
    });

    return entryHTMLSource;
};