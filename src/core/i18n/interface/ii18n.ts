import { ITranslation } from "./itranslation";
import { ITranslations } from "./itranslations";
import { It } from "./it";
import { IAddTranslation } from "./iadd-translation";
import { ISetLanguage } from "./iset-language";

export interface Ii18n {
	translations: ITranslations;
	currentLanguage: string;
	initLanguage: (language: string) => void;
	addTranslation: IAddTranslation;
	t: It;
	setLanguage: ISetLanguage;
	resolve: (key: string, translationJSON: ITranslation) => string;
}
