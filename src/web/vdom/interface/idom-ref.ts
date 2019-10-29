export type IGetDomRef = (refName: string, componentInstance: any) => Node;
export type ISetDomRef = (
	refName: string,
	componentInstance: any,
	node: Node
) => void;
