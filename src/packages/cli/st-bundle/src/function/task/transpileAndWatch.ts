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
const ts = require("@springtype-org/rollup-plugin-ts");
const stripAnsi = require('strip-ansi');
const nodeResolvePlugin = require('rollup-plugin-node-resolve');
import { terser } from "rollup-plugin-terser";
import {reportTranspilationError} from "../reportTranspilationError";

export const transpileAndWatch = async(
    analyzedEntryHTML: AnalyzeEntryHTML,
    baseSourceFilesPath: string,
    io: any,
    opts: any
) => {

    const plugins = [
        nodeResolvePlugin(),
        ts({
            transformers: {
                before: [
                    envTransformer(),
                    importTransformer(path.dirname(analyzedEntryHTML.entryTypeScriptFiles[0]), baseSourceFilesPath)
                ]
            },
            tsconfig: {
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                resolveJsonModule: true,
                jsx: 'react',
                jsxFactory: "ActiveRenderer.createElement"
            }
        })
    ];

    if (opts.optimize) {
        plugins.push(terser());
    }

    const entrySourceFile = getEntryJSModuleFiles(analyzedEntryHTML.entryTypeScriptFiles, baseSourceFilesPath)[0];
    const entryDistFile = getDestFilePath(renameTypeScriptFilesToJS(entrySourceFile));

    const inputOptions = {
        input: entrySourceFile,
        plugins: plugins,
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

    const watchOptions = {
        ...inputOptions,
        output: outputOptions,
        watch: {
            chokidar: {
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

            if (event.error.loc) {
                event.error.loc.relativeFile = path.relative(process.cwd(), event.error.loc.file);
            }
            event.error.plainFrame = stripAnsi(event.error.frame);

            io.emit('bundle-error', event);

            reportTranspilationError(event);
        }
    });
};