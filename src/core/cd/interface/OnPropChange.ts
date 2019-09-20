export enum PropChangeType {
	CHANGE = "CHANGE",
	DEEP_CHANGE = "DEEP_CHANGE"
}

export interface PropChange {
	type: PropChangeType;
	name: string;
	path: string;
	value: any;
	prevValue: any;
}

export type OnPropChangeHandler = (change: PropChange) => void;

export interface OnPropChange {
	onPropChange?(change: PropChange): void;
}
