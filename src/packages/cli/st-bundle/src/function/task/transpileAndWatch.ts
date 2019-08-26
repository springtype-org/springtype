import {envTransformer} from "../typescript/envTransformer";
import {importTransformer} from "../typescript/importTransformer";
import {getEntryJSModuleFiles} from "../bundle-js/getEntryJSModuleFiles";
import {getDestFilePath} from "../getDestFilePath";
import {renameTypeScriptFilesToJS} from "../renameTypeScriptFilesToJS";
import {AnalyzeEntryHTML} from "../entry-html/analyzeEntryHTML";

const rollup = require('rollup');
const chalk = require('chalk');
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const jsonImportPlugin = require('rollup-plugin-json');
const ts = require("@wessberg/rollup-plugin-ts");
const nodeResolvePlugin = require('rollup-plugin-node-resolve');
const commonJSToES2015TransformerPlugin = require('rollup-plugin-commonjs');
import { terser } from "rollup-plugin-terser";
import {reportTranspilationError} from "../reportTranspilationError";
import {reportTranspilationWarning} from "../reportTranspilationWarning";
import {ScriptTarget} from "typescript";

export const transpileAndWatch = async(
    analyzedEntryHTML: AnalyzeEntryHTML,
    baseSourceFilesPath: string,
    io: any,
    opts: any
) => {

    const plugins = [
        jsonImportPlugin(),
        nodeResolvePlugin({
            browser: true,
            dedupe: [ '@springtype/core' ]
        }),
        commonJSToES2015TransformerPlugin({
            include: 'node_modules/**',
        }),
        ts({
            transpiler: "babel",
            tsconfig: {
                target: ScriptTarget.ES2016,
                allowSyntheticDefaultImports: true,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                jsx: 'react',
                jsxFactory: "ActiveRenderer.createElement",
                allowJs: true
            },
            browserslist: ["last 1 version", "> 1%"],
            babelConfig: {
                presets: ["@babel/preset-env"],
                plugins: [
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-proposal-object-rest-spread",
                    "@babel/plugin-proposal-async-generator-functions",
                    ["@babel/plugin-proposal-decorators", { legacy: true }],
                    ["@babel/plugin-syntax-decorators", { decoratorsBeforeExport: false }],
                    "@babel/plugin-proposal-json-strings",
                    ["transform-react-jsx", {
                        "pragma": "ActiveRenderer.createElement"
                    }]
                ]
            },
            transformers: {
                before: [
                    envTransformer(),
                    importTransformer(path.dirname(analyzedEntryHTML.entryTypeScriptFiles[0]), baseSourceFilesPath)
                ]
            }
        })
    ];

    if (opts.optimize) {
        plugins.push(terser());
    }

    const entrySourceFile = getEntryJSModuleFiles(analyzedEntryHTML.entryTypeScriptFiles, baseSourceFilesPath)[0];
    const entryDistFile = getDestFilePath(renameTypeScriptFilesToJS(entrySourceFile));
    const packageJson = JSON.parse(fs.readFileSync('package.json', {
        encoding: 'utf8'
    }));

    const inputOptions = {
        input: entrySourceFile,
        plugins: plugins,
        //external: Object.keys(packageJson.dependencies),
        onwarn: (event) => {

            if (event.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            reportTranspilationWarning(event, io);
        }
    };

    const outputOptions = {
        format: 'iife',
        sourcemap: true,
        name: path.basename(entrySourceFile),
        file: entryDistFile,
        /*
        globals: {
            tslib: 'tslib'
        }*/
    };

    const watchOptions = {
        ...inputOptions,
        output: outputOptions,
        watch: {
            chokidar: {
                paths: ['src/**'],
                ignored: /(^|[\/\\])\../
            }
        }
    };

    const watcher = rollup.watch(watchOptions);

    let transpileStartTime;
    let initialBuild = true;

    watcher.on('event', event => {

        if (event.code == 'BUNDLE_START') {
            transpileStartTime = process.hrtime();
        }

        if (event.code === 'END') {

            io.emit('bundle-finished');

            const timePassed = process.hrtime(transpileStartTime);

            console.log(chalk.green(initialBuild ? 'Built (initial):' : 'Re-built (partial):'), chalk.white(entryDistFile), chalk.magenta(opts.optimize ? '[OPTIMIZED]' : '[NOT OPTIMIMIZED]'));
            console.log(chalk.green('Took:'), chalk.white(timePassed[1] / 1000000), 'ms');
            console.log(chalk.green('Size (uncompressed):'), chalk.white(fs.statSync(entryDistFile).size / 1024), 'KiB');

            const compressedSize = zlib.gzipSync(fs.readFileSync(entryDistFile, {
                encoding: 'utf8'
            })).toString('base64').length;

            console.log(chalk.green('Est. size compressed (gzip): ~'), chalk.white(compressedSize / 1024), 'KiB');

            initialBuild = false;
        }

        if (event.code === 'ERROR' || event.code === 'FATAL') {
            reportTranspilationError(event, io);
        }
    });
};