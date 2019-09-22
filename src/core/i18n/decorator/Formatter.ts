import { st } from "../..";
import { IFormatterFunction } from "../interface/ii18n";

export const formatter = (
	name: string,
	formatterFn: IFormatterFunction
): any => {
	st.i18n.addFormatter(name, formatterFn);

	return (ctor: any) => {
		return ctor;
	};
};
