import {saveEntryHTMLToDist} from "../entry-html/saveEntryHTMLToDist";
import {transformEntryHTML} from "../entry-html/transformEntryHTML";
import {analyzeEntryHTML, AnalyzeEntryHTML} from "../entry-html/analyzeEntryHTML";

const chalk = require('chalk');

export const processEntryHTMLFile = async(entryHTMLFilePath: string): Promise<AnalyzeEntryHTML> => {

    console.log(chalk.green('Statically analyzing entry HTML file:'), chalk.white(entryHTMLFilePath));

    const analyzedEntryHTML = await analyzeEntryHTML(entryHTMLFilePath);

    console.log(chalk.green('Found entry TypeScript file(s):'), analyzedEntryHTML.entryTypeScriptFiles);

    const transformedEntryHTML = transformEntryHTML(
        analyzedEntryHTML.htmlSource,
        analyzedEntryHTML.entryTypeScriptFiles
    );

    await saveEntryHTMLToDist(entryHTMLFilePath, transformedEntryHTML);

    // TODO: Copy static file resources (index.html)

    return analyzedEntryHTML;
};