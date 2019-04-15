import { Translator } from "@springtype/springtype-incubator-i18n";
export declare const dateFormat: (date: any, dateFormat: string) => string;
export declare class AppTranslationConfig {
    private translator;
    constructor(translator: Translator);
}
