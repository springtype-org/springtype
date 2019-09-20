export interface INodeRef {
	[refName: string]: Node;
}

export interface IDOMRef {
	map: WeakMap<any, INodeRef>;
	get(refName: string, customElementInstance: any): Node;
	set(refName: string, customElementInstance: any, node: Node): void;
	delete(customElementInstance: any): void;
}
