import { st } from "../..";
import { FormatterFunction } from "../interface/Ii18n";

export const Formatter = (
	name: string,
	formatterFn: FormatterFunction
): any => {
	st.i18n.addFormatter(name, formatterFn);

	return (ctor: any) => {
		return ctor;
	};
};
