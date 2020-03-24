import { ITranslationValues } from "./itranslation-values";

export type It = (key: string|Array<string>, values?: ITranslationValues) => string;
