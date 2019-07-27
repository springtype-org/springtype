import {Node} from "../interface/ast/Node";
import {CommentNode} from "../interface/ast/CommentNode";
import {RuleNode} from "../interface/ast/RuleNode";
import {NodeTypes} from "../interface/NodeTypes";
import {DeclarationNode} from "../interface/ast/DeclarationNode";
import {isNumericString} from "./isNumericString";

export function cssNodeVisitor(node: Node): string {

    switch (node.type) {

        case NodeTypes.ROOT:

            let objectLiteralText = '';

            // first level of sub-nodes
            node.nodes.forEach((node: Node, index: number, nodes: Array<Node>) => {
                objectLiteralText += cssNodeVisitor(node);

                if (index === nodes.length-1) {
                    objectLiteralText += '\n';
                } else {
                    objectLiteralText += '\n\n';
                }
            });

            return objectLiteralText;

        case NodeTypes.COMMENT:
            return `\n/* ${(<CommentNode> node).text} */`;

        case NodeTypes.RULE:

            const ruleNode = <RuleNode> node;
            const selectorText = `${ruleNode.selector}`.replace(/\s/g, '');

            let ruleLiteralText = '';

            ruleNode.nodes.forEach((node: Node) => {
                ruleLiteralText += cssNodeVisitor(node) + ',\n';
            });

            return `'${selectorText}': {
${ruleLiteralText}},`;

        case NodeTypes.DECL:

            const declarationNode = <DeclarationNode> node;
            let valueText = declarationNode.value;

            // TODO: Support for duplicate identifier -> [value1, value2] syntax support
            if (!isNumericString(declarationNode.value)) {
                valueText = `'${valueText.replace(/'/g, "\\'")}'`;
            }

            return `    '${declarationNode.prop}': ${valueText}`;

        default:
            console.log('Found unknown node type: ', node.type);
    }
}