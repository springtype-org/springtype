import {getDestFilePath} from "../getDestFilePath";

const rollup = require('rollup');
const path = require('path');
const chalk = require('chalk');
const nodeResolvePlugin = require('rollup-plugin-node-resolve');
//import { terser } from "rollup-plugin-terser";
const ts = require("@wessberg/rollup-plugin-ts");

import {envTransformer} from "../typescript/envTransformer";
import {importTransformer} from "../typescript/importTransformer";
import {renameTypeScriptFilesToJS} from "../renameTypeScriptFilesToJS";

export const bundleJSModules = async(entrySourceFiles: Array<string>, baseSourceFilesPath: string, minify: boolean = true) => {

    console.log('Bundling...', entrySourceFiles);

    const bundle = async(entrySourceFile: string) => {

        const entryDistFile = getDestFilePath(renameTypeScriptFilesToJS(entrySourceFile));

        const plugins = [
            //multiInput(),
            nodeResolvePlugin(),
            ts({
                transformers: {
                    before: [
                        envTransformer(),
                        importTransformer(path.dirname(entrySourceFile), baseSourceFilesPath)
                    ]
                },
                tsconfig: {
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    jsx: 'react',
                    jsxFactory: "ActiveRenderer.createElement"
                }
            })
        ];

        if (minify) {
            //plugins.push(terser())
        }

        // see below for details on the options
        const inputOptions = {
            input: entrySourceFile,
            plugins: plugins,
            watch: true,
            onwarn: (warning) => {

                if (warning.code === 'THIS_IS_UNDEFINED') {
                    return;
                }
                console.log(chalk.yellow(warning.message));
            }
        };

        const outputOptions = {
            format: 'iife',
            sourcemap: true,
            name: path.basename(entrySourceFile),
            file: entryDistFile
        };

        console.log('output file', entryDistFile);

        // create a bundle
        const bundle = await rollup.rollup(inputOptions);

        // generate code
        await bundle.generate(outputOptions);

        // write to disk
        await bundle.write(outputOptions);
    };

    for (let i=0; i<entrySourceFiles.length; i++) {
        await bundle(entrySourceFiles[i]);
    }
};