#!/usr/bin/env node

import {isTypeScriptFile} from "./function/isTypeScriptFile";
import {transpileTypeScriptModule} from "./function/task/transpileTypeScriptModule";
import {processEntryHTMLFile} from "./function/task/processEntryHTMLFile";
import {bundleJSModules} from "./function/task/bundleJSModules";
import {getEntryJSModuleFiles} from "./function/bundle-js/getEntryJSModuleFiles";
import {AnalyzeEntryHTML} from "./function/entry-html/analyzeEntryHTML";

const chokidar = require('chokidar');
const path = require('path');

const args: Array<string> = process.argv.slice(2);
const entryHTMLFilePath = args[0];
const baseSourceFilesPath = path.dirname(entryHTMLFilePath);

(async() => {

    let entryHTMLProcessState = false;
    const requestEntryHTMLProcessing = async() => {

        if (!entryHTMLProcessState) {

            entryHTMLProcessState = true;

            analyzedEntryHTML = await processEntryHTMLFile(entryHTMLFilePath);

            entryHTMLProcessState = false;
        }
    };

    let bundleState = false;
    const requestBundleGeneratorRun = async() => {

        if (!bundleState) {

            bundleState = true;

            await bundleJSModules(
                getEntryJSModuleFiles(analyzedEntryHTML.entryTypeScriptFiles, baseSourceFilesPath),
                false
            );

            bundleState = false;
        }
    };

    console.log('Analyzing: ', entryHTMLFilePath);

    // 0. Initial Entry HTML file processing
    let analyzedEntryHTML: AnalyzeEntryHTML = await processEntryHTMLFile(entryHTMLFilePath);

    console.log('Watching for file changes in: ', baseSourceFilesPath);

    // 0. ongoing watch for changes
    chokidar.watch([
        `${baseSourceFilesPath}/**/*.ts`,
        `${baseSourceFilesPath}/**/*.tsx`
    ], {

        // ignore . files
        ignored: /(^|[\/\\])\../
    }).on('all', async(event, moduleFilePath) => {

        console.log('File', event, ':', moduleFilePath);

        if (!isTypeScriptFile(moduleFilePath)) {

            // on-going HTML file processing
            await requestEntryHTMLProcessing();

        } else {

            // on-going TypeScript files compilation
            //if (event !== 'add') {

                // 1. compile source
                await transpileTypeScriptModule(moduleFilePath, baseSourceFilesPath);

                // 2. optimize and bundle compiled sources using rollup
                await requestBundleGeneratorRun();

            //}
        }
    });

})();