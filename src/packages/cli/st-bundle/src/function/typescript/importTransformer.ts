import * as ts from 'typescript';
import {copyAsset} from "../copyAsset";
const fs = require('fs');
const path = require('path');

export function importTransformer<T extends ts.Node>(sourceFilePath: string, baseSourceFilesPath: string): ts.TransformerFactory<T> {

    return (context) => {

        console.log('import transformer?!');

        const visit: ts.Visitor = (node) => {

            if (ts.isCallExpression(node)) {

                if (node.expression.getText() === 'import') {

                    // @ts-ignore
                    const resourcePath: string = node.arguments[0].text;
                    const basePathDepth = baseSourceFilesPath.split('/').length;
                    const sourceFileRelativeResourcePath = path.resolve(baseSourceFilesPath, resourcePath);

                    if (!fs.existsSync(sourceFileRelativeResourcePath)) {

                        return ts.createStringLiteral('st-bundle: ERROR: File does not exist: ' + resourcePath);

                    } else if (!resourcePath.endsWith('.ts') && !resourcePath.endsWith('.tsx')) {

                        // make sure asset file is available in destination path
                        copyAsset(sourceFileRelativeResourcePath,
                            path.resolve('dist', baseSourceFilesPath, baseSourceFilesPath, resourcePath));

                        return ts.createStringLiteral(resourcePath.split('/').slice(basePathDepth).join('/'));
                    }
                }
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            return ts.visitEachChild(node, (child) => visit(child), context);
        };
        return (node) => ts.visitNode(node, visit);
    };
}

