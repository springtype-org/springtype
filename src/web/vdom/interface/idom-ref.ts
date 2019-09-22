export type IGetDomRef = (refName: string, customElementInstance: any) => Node;
export type ISetDomRef = (
	refName: string,
	customElementInstance: any,
	node: Node
) => void;
