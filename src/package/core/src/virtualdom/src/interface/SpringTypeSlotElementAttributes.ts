import {Partial} from "../../../lang";
import {HTMLVirtualElementAttributes} from "./HTMLIntrinsicElements";

export interface SpringTypeSlotElementAttributes extends Partial<HTMLVirtualElementAttributes<SpringTypeSlotElementAttributes>> {
    name: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-slot': Partial<SpringTypeSlotElementAttributes>;
        }
    }
}