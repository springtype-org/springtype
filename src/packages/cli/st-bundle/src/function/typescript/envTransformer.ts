import * as ts from 'typescript';

// https://stackoverflow.com/questions/56845179/how-do-i-attach-custom-transformers-to-a-compiler-host
// https://github.com/Microsoft/TypeScript/blob/865b3e786277233585e1586edba52bf837b61b71/src/services/transpile.ts#L26

export function envTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
    return (context) => {

        // visit AST node
        const visit: ts.Visitor = (node) => {

            // @ts-ignore
            if (ts.isPropertyAccessExpression(node) && node.expression) {

                // @ts-ignore
                if (node.expression.expression && node.expression.expression.getText() && node.expression.expression.getText() === 'process' &&
                    // @ts-ignore
                    node.expression.name && node.expression.name.getText() && node.expression.name.getText() === 'env') {

                    // @ts-ignore
                    const envVarName = node.name.getText();
                    const envVarValue = process.env[envVarName];

                    return ts.createStringLiteral(envVarValue || '');
                }
            }
            return ts.visitEachChild(node, (child) => visit(child), context);
        };

        return (node) => ts.visitNode(node, visit);
    };
}

