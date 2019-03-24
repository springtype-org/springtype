import {ApplicationContext} from "@springtype/springtype-incubator-core";
import {default as i18next, FormatFunction} from "i18next";
import {TranslationFormatterMap} from "../interface/TranslationFormatterMap";
import {TRANSLATION_FORMAT} from "../constants";

export function TranslationFormat(formatName: string, formatter: FormatFunction): any {

    let formatters: TranslationFormatterMap = ApplicationContext.getGlobal(TRANSLATION_FORMAT);
    if (!formatters) formatters = {};
    formatters[formatName] = formatter;
    ApplicationContext.setGlobal(TRANSLATION_FORMAT, formatters);

    // called with @TranslationFormat({})
    if (!(typeof formatName === 'function')) {
        return (target: any) => {
            return target;
        }
    }
}