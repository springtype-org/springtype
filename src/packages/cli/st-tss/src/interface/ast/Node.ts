import {NodeTypes} from "../NodeTypes";

export interface Node {
    type: NodeTypes;
    nodes: Array<Node>;
}