import { ITranslations } from "./itranslations";
import { It } from "./it";
import { IAddTranslation } from "./iadd-translation";
import { ISetLanguage } from "./iset-language";

export interface Ii18n {
	translations: ITranslations;
	registeredTComponents: Array<any>;
	currentLanguage: string;
	fallbackLanguage: string;
	initLanguage: (language: string) => void;
	addTranslation: IAddTranslation;
	t: It;
	setLanguage: ISetLanguage;
	setFallbackLanguage: ISetLanguage;
	registerTComponent: (tComponent: any) => void;
	unregisterTComponent: (tComponent: any) => void;
	translateRegisteredComponents: () => void;
}
