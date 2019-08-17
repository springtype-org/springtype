import {envTransformer} from "../typescript/envTransformer";
import {importTransformer} from "../typescript/importTransformer";
import {getCacheFilePath} from "../getCacheFilePath";

const ts = require('typescript');
const fs = require('fs');
const path = require('path');

export const transpileTypeScriptModule = async(moduleFilePath: string, baseSourceFilesPath: string) => {

    // read module source code
    const moduleSourceCode = fs.readFileSync(path.resolve(moduleFilePath), {
        encoding: 'utf8'
    });

    // e.g. index.tsx -> index
    const sourceFileName = path.basename(moduleFilePath);
    const moduleNameParts = sourceFileName.split('.');
    const moduleName = moduleNameParts[0];

    console.log('Compiling TS module: ', moduleFilePath);

    const transpileOutput = ts.transpileModule(moduleSourceCode, {
        compilerOptions: {
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            strictPropertyInitialization: false,
            downlevelIteration: true,
            importHelpers: true,
            lib: [
                "dom",
                "es2017"
            ],
            target: "es5",
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            types: ["node"],
            strict: false,
            noImplicitAny: false,
            module: ts.ModuleKind.ES2015,
            declaration: true,
            sourceMap: true,
            jsx: 'react',
            jsxFactory: "ActiveRenderer.createElement"
        },
        transformers: {
            before: [
                envTransformer(),
                importTransformer(path.dirname(moduleFilePath), baseSourceFilesPath)
            ]
        },
        moduleName,
        fileName: sourceFileName
    });

    const outputDirName = path.dirname(path.resolve(getCacheFilePath(moduleFilePath)));

    console.log('Persisting JS module in: ', outputDirName);

    if (!fs.existsSync(outputDirName)) {
        fs.mkdirSync(outputDirName, { recursive: true });
    }

    const outputFileName = `${moduleName}.js`;
    const outputSourceMapFileName = `${outputFileName}.map`;

    fs.writeFileSync(path.resolve(outputDirName, outputFileName), transpileOutput.outputText);
    fs.writeFileSync(path.resolve(outputDirName, outputSourceMapFileName), transpileOutput.sourceMapText ? transpileOutput.sourceMapText : '');
};