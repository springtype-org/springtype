import { ITranslation } from "./itranslation";
import { Ii18n } from "./ii18n";

export type IAddTranslation = (language: string, translation: ITranslation) => Ii18n;
