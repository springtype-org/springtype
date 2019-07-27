import {Node} from "../interface/ast/Node";
import {cssNodeVisitor} from "./cssNodeVisitor";

export function transformCSStoTSS(node: Node) {
    const tssObjectLiteralText = cssNodeVisitor(node);

    // 1. indention
    let indentedTSSObjectLiteralText = '';

    tssObjectLiteralText.split('\n').forEach((line: string) => {
        indentedTSSObjectLiteralText += `    ${line}\n`;
    });

    // 3. wrapping in curly braces
    return `import {TypedMediaQueryStyleSheet} from "@springtype/core";

export default (component: any, theme: any): TypedMediaQueryStyleSheet => ({${indentedTSSObjectLiteralText}});\n`;
}