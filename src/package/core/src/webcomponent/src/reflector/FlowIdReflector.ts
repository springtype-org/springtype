import {AbstractWeakMapReflector} from "../../../di";

export class FlowIdReflector extends AbstractWeakMapReflector {

    protected static get REFLECTOR_NAME() {
        return 'FlowIdReflector'
    };

    static set(node: Node, id: number) {
        return super.set(node, id);
    }

    static get(node: Node): number {
        return super.get(node) || -1;
    }

    static has(node: Node): boolean {
        return super.has(node);
    }
}