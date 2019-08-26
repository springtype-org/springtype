const htmlparser2 = require("htmlparser2");
const fs = require('fs');

export interface AnalyzeEntryHTML {
    htmlSource: string;
    entryTypeScriptFiles: Array<string>;
}

export const analyzeEntryHTML = async(entryHTMLPath: string): Promise<AnalyzeEntryHTML> => {

    const entryTypeScriptFiles = [];

    // TODO: static file resources
    const parser = new htmlparser2.Parser({
        onopentag(name, attribs) {
            if (name === "script" && (
                attribs.src.endsWith('.ts') ||
                attribs.src.endsWith('.tsx')
            )) {
                entryTypeScriptFiles.push(attribs.src);
            }
        }
    }, {
        decodeEntities: true
    });

    const parse = async() => {
        return new Promise<string>((resolve, reject) => {

            fs.readFile(entryHTMLPath, 'utf8', async(err, htmlSource) => {
                if (!err) {
                    parser.write(htmlSource);
                    parser.end();

                    resolve(htmlSource);
                } else {
                    reject(err);
                }
            });
        });
    };

    const htmlSource = await parse();

    return {
        htmlSource,
        entryTypeScriptFiles
    };
};