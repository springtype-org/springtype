export enum PropChangeType {
	CHANGE = "CHANGE",
	DEEP_CHANGE = "DEEP_CHANGE"
}

export interface IPropChange {
	type: PropChangeType;
	name: string;
	path: string;
	value: any;
	prevValue: any;
}

export type IOnPropChangeHandler = (change: IPropChange) => void;

export interface IOnPropChange {
	onPropChange?(change: IPropChange): void;
}
