//export type IVirtualNodeType = ICustomElement | string | null;
export type IVirtualNodeType = string;
export interface IVirtualNodeAttributes {
	key?: string; // TODO: Use the key! -- on lists, auto-generate
	[attributeName: string]: any;
}

export interface IVirtualNode<A = IVirtualNodeAttributes> {
	type: IVirtualNodeType;
	attributes: A;
	children: IVirtualChildren;
}

export type IVirtualKey = string | number | any;
export type IVirtualRefObject<T> = { current?: T | null };
export type IVirtualRefCallback<T> = (instance: T | null) => void;
export type IVirtualRef<T> = IVirtualRefObject<T> | IVirtualRefCallback<T>;

export type IVirtualChild =
	| IVirtualNode<any>
	| object
	| string
	| number
	| boolean
	| null
	| undefined;
//export type IVirtualChildren = IVirtualChild[] | IVirtualChild;
export type IVirtualChildren = IVirtualChild[];
