
export interface ISpringTypeAttributes {

	// to tell the VDOM to ignore this element and all it's children and subtrees
	novdom?: boolean;

	// to unwrap an element (promote children one DOM tree level up)
	unwrap?: boolean;

	// to set a DOM reference for VDOM/component instance binding
	ref?: {
		[key: string]: any;
	} | any;

	// to name a target slot
	slot?: string | string;

	// virtual component instance reference, available on mounted "root" DOM elements
	$stComponent?: any;

	// array-local unique key to identify element items in a NodeList
	key?: string;

	// children
	//children?: HTMLCollection | any;

	class?: string | Array<string>;
}

export interface IElement extends HTMLElement, ISpringTypeAttributes {

	children: HTMLCollection | any;

	slot: string | string;

}
