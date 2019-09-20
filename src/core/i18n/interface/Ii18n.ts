export interface ITranslation {
	[key: string]: string | ITranslation;
}

export interface ITranslationValues {
	[key: string]: any;
}
export interface Translations {
	[language: string]: ITranslation;
}

export interface Formatters {
	[key: string]: Function;
}

export type FormatterFunction = (value: string) => string;

export interface Ii18n {
	formatters: Formatters;
	translations: Translations;
	currentLanguage: string;
	initLanguage: (language: string) => void;
	addFormatter: (identifier: string, formatter: FormatterFunction) => Ii18n;
	addTranslation: (language: string, translation: ITranslation) => Ii18n;
	t: (key: string, values?: ITranslationValues) => string;
	setLanguage: (language: string) => Ii18n;
}
