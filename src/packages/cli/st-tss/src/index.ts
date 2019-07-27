#!/usr/bin/env node

import {existsSync, mkdirSync, writeFileSync} from "fs";
import {transformCSStoTSS} from "./function/transformCSStoTSS";

const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const paths = process.argv.slice(2);
const postcssScss = require('postcss-scss');
const postcssLess = require('postcss-less');
const postcssSass = require('@csstools/postcss-sass');
const postcssCss = require('postcss');

if (process.argv.length < 4) {
    console.log('Please name source (CSS) and target (TSS) directory like:');
    console.log('npx st-css-to-tss bootstrap/css bootstrap/tss');
    process.exit(1);
}

const currentDirectory = process.cwd();
const sourceDirectory = path.resolve(currentDirectory, paths[0]);
const destinationDirectory = path.resolve(currentDirectory, paths[1]);

console.log('Transform CSS from', sourceDirectory, 'to', destinationDirectory);

const fileNameExtension =  (filename: string) => {
    const ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
};

glob(sourceDirectory + '/**/*.*', {},  (err: Error, files: Array<string>) => {

    //console.log('files', files)
    let sassFiles = 0;
    let cssFiles = 0;
    let lessFiles = 0;
    let scssFiles = 0;

    files.forEach((file: string) => {

        try {

            const code = fs.readFileSync(file, 'utf8');
            let destinationFile = destinationDirectory + path.sep + file.replace(sourceDirectory, '');
            let tss = '';

            console.log('Transforming', file, 'to', destinationFile);

            switch (fileNameExtension(file)) {

                case "sass":
                    console.error('TODO: Sass not implemented yet, file will be empty!');
                    postcssSass.process(code).result.root;
                    sassFiles++;
                    break;
                case "scss":
                    console.error('TODO: Sass not implemented yet, file will be empty!');
                    postcssScss.parse(code);
                    scssFiles++;
                    break;
                case "less":
                    console.error('TODO: Sass not implemented yet, file will be empty!');
                    postcssLess.parse(code);
                    lessFiles++;
                    break;
                case "css":
                    tss = transformCSStoTSS(postcssCss.parse(code));
                    destinationFile = destinationFile.replace('.css', '.tss.ts');
                    cssFiles++;
            }

            if (!existsSync(destinationDirectory)) {
                mkdirSync(destinationDirectory);
            }

            process.chdir(destinationDirectory);

            writeFileSync(destinationFile, tss);

        } catch(error) {
            console.log('Error in', file);
            console.error('Parse error:', error)

        }
    });

    console.log('Successfully parsed to AST:');
    console.log(`  ${sassFiles} Sass files`);
    console.log(`  ${cssFiles} CSS files`);
    console.log(`  ${lessFiles} Less files`);
    console.log(`  ${scssFiles} SCSS files`);
});


