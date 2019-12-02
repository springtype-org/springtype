import { st } from "../..";
import { IFormatterFunction } from "../interface/iformatter-function";

export const formatter = (
	name: string,
	formatterFn: IFormatterFunction
): any => {
	st.formatter.addFormatter(name, formatterFn);

	return (ctor: any) => {
		return ctor;
	};
};
