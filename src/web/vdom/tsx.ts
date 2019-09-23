import {st} from "../../core";
import {
    IVirtualChild,
    IVirtualChildren,
    IVirtualNode,
    IVirtualNodeType
} from "./interface/ivirtual-node";

export const tsxToStandardAttributeName = (
    tsxAttributeName: string
): string => {
    // support for SVG xlink:*
    if (tsxAttributeName.startsWith("xlink")) {
        return "xlink:" + tsxAttributeName.replace("xlink", "").toLowerCase();
    }

    switch (tsxAttributeName) {
        // support for React className -> class
        case "className":
            return "class";
    }
    return tsxAttributeName;
};

export const tsx = st.tsx = (
    type: IVirtualNodeType,
    attributes:
        | JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any>
        | null,
    ...children: IVirtualChildren[]
): IVirtualNode<any> => {
    // attributes can be null or an object: clone
    attributes = {...attributes};
    // TODO: mock
    // it's a custom element, but it's not registered
    if (type.indexOf("-") > -1 && !customElements.get(type)) {
        st.error(
            new Error(
                `💣 <${type} /> is used but not imported. Make sure to import the custom element class that defines ${type}. Look for a file containing: @customElement('${type}')!`
            )
        );
    }

    return {
        type,
        attributes,
        children
    };
};


export const transformVisitor = (node: IVirtualNode, processors: Array<Function> = []): any => {

	const process = (node: IVirtualNode) => {
		for (let processor of processors) {
			node = processor(node);
		}
		return node;
	};

    const visit = (node: IVirtualNode) => {
    	if (!node) return node;
    	node = process(node);
    	if (!node.children) return node;
        for (let i = 0; i < node.children.length; i++) {
			node.children[i] = visit(node.children[i]);
        }
        return node;
    };
	node = visit(node);
    return node;
};