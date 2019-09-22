export interface IDOMAttributes {
	// used to reference DOM nodes to CustomComponent instances
	// this allows calls to st.getRef('$ref', $customElementInstance)
	ref?: {
		[refName: string]: any;
	};

	// array-local unique key to identify element items in a NodeList
	key?: string;

	// allows to unwrap an element and render it's childNodes instead
	unwrap?: boolean;
}
