// force-import interfaces for framework and Web Standard TSX types
import "./src/interface/HTMLIntrinsicElements";
import "./src/interface/SVGIntrinsicElements";

// typing for <st-fragment>
import "./src/interface/SpringTypeFragmentElementAttributes";

// typing for <st-slot>
import "./src/interface/SpringTypeSlotElementAttributes";

export * from "./src/interface/VirtualElement";
export * from "./src/constants";
export * from "./src/transformation/transformElementToVirtualElement";
export * from "./src/transformation/transformToFlatElementList";
export * from "./src/transformation/VirtualDOMTransformer";
export * from "./src/mutation/VirtualDOMMutator";