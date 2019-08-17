import {saveEntryHTMLToDist} from "../entry-html/saveEntryHTMLToDist";
import {transformEntryHTML} from "../entry-html/transformEntryHTML";
import {analyzeEntryHTML, AnalyzeEntryHTML} from "../entry-html/analyzeEntryHTML";

export const processEntryHTMLFile = async(entryHTMLFilePath: string): Promise<AnalyzeEntryHTML> => {

    console.log('Processing Entry HTML file...');

    const analyzedEntryHTML = await analyzeEntryHTML(entryHTMLFilePath);

    console.log('Found entry TypeScript files (bundle modules): ', analyzedEntryHTML.entryTypeScriptFiles);

    const transformedEntryHTML = transformEntryHTML(
        analyzedEntryHTML.htmlSource,
        analyzedEntryHTML.entryTypeScriptFiles
    );

    await saveEntryHTMLToDist(entryHTMLFilePath, transformedEntryHTML);

    // TODO: Copy static file resources (index.html)

    return analyzedEntryHTML;
};