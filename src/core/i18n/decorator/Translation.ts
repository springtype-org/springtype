import { st } from "../..";
import "../I18n";
import { ITranslation } from "../interface/Ii18n";

export const translation = (
	language: string,
	translation: ITranslation
): any => {
	st.i18n.addTranslation(language, translation);

	return (ctor: any) => {
		return ctor;
	};
};
