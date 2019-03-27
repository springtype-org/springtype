import {VirtualElement} from "../../../virtualdom";
import {AbstractWeakMapReflector} from "../../../di";

export class SlotChildrenReflector extends AbstractWeakMapReflector {

    protected static get REFLECTOR_NAME() {
        return 'SlotChildrenReflector'
    };

    static set(node: Element, slotChildren: Array<VirtualElement|string>) {
        return super.set(node, slotChildren);
    }

    static get(node: Element): Array<VirtualElement|string> {
        return super.get(node) || [];
    }

    static has(node: Element): boolean {
        return super.has(node);
    }
}