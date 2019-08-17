import {getDestFilePath} from "../getDestFilePath";

const rollup = require('rollup');
const path = require('path');
const nodeResolvePlugin = require('rollup-plugin-node-resolve');
import { terser } from "rollup-plugin-terser";

export const bundleJSModules = async(entrySourceFiles: Array<string>, minify: boolean = true) => {

    console.log('Bundling...', entrySourceFiles);

    const bundle = async(entrySourceFile: string) => {

        const entryDistFile = getDestFilePath(
            // erase the first directory ('.cache') first
            entrySourceFile.split('/').slice(1).join('/')
        );

        const plugins = [
            nodeResolvePlugin()
        ];

        if (minify) {
            plugins.push(terser())
        }

        // see below for details on the options
        const inputOptions = {
            //experimentalCodeSplitting: true,
            input: entrySourceFile,
            plugins: plugins,
            onwarn: function (warning) {

                if (warning.code === 'THIS_IS_UNDEFINED') {
                    return;
                }
                console.error(warning);
            },
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

        //console.log(bundle.watchFiles); // an array of file names this bundle depends on

        // generate code
        const { output } = await bundle.generate(outputOptions);

        for (const chunkOrAsset of output) {
            if (chunkOrAsset.isAsset) {
                // For assets, this contains
                // {
                //   isAsset: true,                 // signifies that this is an asset
                //   fileName: string,              // the asset file name
                //   source: string | Buffer        // the asset source
                // }
                //console.log('Asset', chunkOrAsset);
            } else {
                // For chunks, this contains
                // {
                //   code: string,                  // the generated JS code
                //   dynamicImports: string[],      // external modules imported dynamically by the chunk
                //   exports: string[],             // exported variable names
                //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
                //   fileName: string,              // the chunk file name
                //   imports: string[],             // external modules imported statically by the chunk
                //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
                //   isEntry: boolean,              // is this chunk a static entry point
                //   map: string | null,            // sourcemaps if present
                //   modules: {                     // information about the modules in this chunk
                //     [id: string]: {
                //       renderedExports: string[]; // exported variable names that were included
                //       removedExports: string[];  // exported variable names that were removed
                //       renderedLength: number;    // the length of the remaining code in this module
                //       originalLength: number;    // the original length of the code in this module
                //     };
                //   },
                //   name: string                   // the name of this chunk as used in naming patterns
                // }
                //console.log('Chunk', chunkOrAsset.modules);
            }
        }

        // or write the bundle to disk
        await bundle.write(outputOptions);
    };

    for (let i=0; i<entrySourceFiles.length; i++) {
        await bundle(entrySourceFiles[i]);
    }
};