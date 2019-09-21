export interface ITranslation {
	[key: string]: string | ITranslation;
}

export interface ITranslationValues {
	[key: string]: any;
}
export interface ITranslations {
	[language: string]: ITranslation;
}

export interface IFormatters {
	[key: string]: Function;
}

export type IFormatterFunction = (value: string) => string;
export type It = (key: string, values?: ITranslationValues) => string;

export interface Ii18n {
	formatters: IFormatters;
	translations: ITranslations;
	currentLanguage: string;
	initLanguage: (language: string) => void;
	addFormatter: (identifier: string, formatter: IFormatterFunction) => Ii18n;
	addTranslation: (language: string, translation: ITranslation) => Ii18n;
	t: (key: string, values?: ITranslationValues) => string;
	setLanguage: (language: string) => Ii18n;
}
