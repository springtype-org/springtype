import {Translator, Translations, t, TranslationFormat} from "@springtype/springtype-incubator-i18n";
import {Component} from "@springtype/springtype-incubator-core";
import {format} from "date-fns";

import * as englishTranslations from "./translation/en.json";
import * as germanTranslations from "./translation/de.json";

const dateFnsLocales = {
    en: require('date-fns/locale/en'),
    de: require('date-fns/locale/de')
};

const localeId = 'de';

export const dateFormat = (date: any, dateFormat: string) => {
    return format(date, dateFormat, {
        locale: dateFnsLocales[localeId]
    })
};

@Translations('en', englishTranslations)
@Translations('de', germanTranslations)
@TranslationFormat('uppercase', (value: string) => (value || '').toUpperCase())
@TranslationFormat('DD-MM-YYYY_HH:mm:ss', (value: string) => dateFormat(value, 'DD-MM-YYYY HH:mm:ss'))
@Component
export class AppTranslationConfig {

    constructor(private translator: Translator) {


        // keep translations in sync
        translator.onLanguageChanged((language: string) => {

            //debugger;
            console.log('FIXME: @Buffer i18n language changed', language);
        });
    }
}