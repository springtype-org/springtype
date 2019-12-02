import { st } from "../..";
import "../i18n";
import { ITranslation } from "../interface/itranslation";

export const translation = (
	language: string,
	translation: ITranslation
): any => {
	st.i18n.addTranslation(language, translation);

	return (ctor: any) => {
		return ctor;
	};
};
