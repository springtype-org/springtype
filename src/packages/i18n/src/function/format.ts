import {ApplicationContext} from "@springtype/springtype-incubator-core";
import {FormatFunction} from "i18next";
import {TranslationFormatterMap} from "../interface/TranslationFormatterMap";
import {TRANSLATION_FORMAT} from "../constants";

export const format: FormatFunction = (value: any, format?: string, lng?: string): string => {

    const formatters: TranslationFormatterMap = ApplicationContext.getGlobal(TRANSLATION_FORMAT);

    if (typeof formatters[format || ''] === 'function') {
        return formatters[format || ''](value, format, lng);
    }
    return value;
};