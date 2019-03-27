import {TranslationFormat, Translations, Translator} from "@springtype/springtype-incubator-i18n";
import {buffer, Component} from "@springtype/springtype-incubator-core";
import {format} from "date-fns";

import * as englishTranslations from "./translation/en.json";
import * as germanTranslations from "./translation/de.json";

const dateFnsLocales: any = {
    en: require('date-fns/locale/en'),
    de: require('date-fns/locale/de')
};

let localeId = 'de';

export const dateFormat = (date: any, dateFormat: string) => {
    return format(date, dateFormat, {
        locale: dateFnsLocales[localeId]
    })
};

@Translations('en', englishTranslations)
@Translations('de', germanTranslations)
@TranslationFormat('uppercase', (value: string) => (value || '').toUpperCase())
@TranslationFormat('DD-MM-YYYY_HH:mm:ss', (value: string) => dateFormat(value, 'dddd, DD-MM-YYYY HH:mm:ss'))
@Component
export class AppTranslationConfig {

    constructor(private translator: Translator) {

        // this method is called 4 times by the framework internally.
        // this is because of language detection and expected behaviour,
        // but we want to aggregate those calls and listen to only the
        // last one in a time-frame of 10ms. Thus, we buffer the event listener:
        const onLanguageChange = buffer(
            (language: string) => {

                // keep translations in sync: when language changes, tell date-fns to change accordingly
                localeId = language;

            }, 10 /* ms */
        );

        translator.onLanguageChanged(onLanguageChange);
    }
}