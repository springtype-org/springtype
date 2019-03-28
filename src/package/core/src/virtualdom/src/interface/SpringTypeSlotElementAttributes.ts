import {Merge, Partial} from "../../../lang";
import {VirtualElementAttributes} from "./TypedVirtualElementAttributes";
import {HTMLVirtualElementAttributes} from "./HTMLIntrinsicElements";

export interface SpringTypeSlotElementAttributes extends Partial<VirtualElementAttributes> {
    name?: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-slot':  Merge<Partial<HTMLVirtualElementAttributes>, Partial<SpringTypeSlotElementAttributes>>;
        }
    }
}