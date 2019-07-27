import {Node} from "./Node";

export interface DeclarationNode extends Node {
    prop: string;
    value: string;
}