export type IOnChangeHandler = (value: any, prevValue: any) => void;
export type IOnDeepChangeHandler = (
	path: string,
	value: any,
	prevValue: any
) => void;
