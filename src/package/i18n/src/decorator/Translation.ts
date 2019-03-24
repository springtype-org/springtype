import {InitOptions} from "i18next";
import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import {LanguageDetectorOptions} from "../interface/LanguageDetectorOptions";
import {DEFAULT_FALLBACK_LANGUAGES, DEFAULT_NAMESPACE} from "../defaults";
import {log} from "@springtype/springtype-incubator-core";

// see https://www.i18next.com/overview/configuration-options
export function Translation(translationConfig?: InitOptions, languageDetectorConfig?: LanguageDetectorOptions, onInit?: () => void): any {

    const lngDetector = new LngDetector();

    if (languageDetectorConfig) {
        lngDetector.init(languageDetectorConfig);
    }

    if (!translationConfig) {
        translationConfig = {};
    }

    if (!translationConfig.ns) {
        translationConfig.ns = [DEFAULT_NAMESPACE];
    }

    if (!translationConfig.defaultNS) {
        translationConfig.defaultNS = DEFAULT_NAMESPACE;
    }

    if (!translationConfig.fallbackLng) {
        translationConfig.fallbackLng = DEFAULT_FALLBACK_LANGUAGES;
    }

    if (!onInit) {
        onInit = () => {};
    }

    i18next
        .use(lngDetector)
        .init(translationConfig, onInit);

    // called with @Translation() or @Translation({})
    if (!(typeof translationConfig === 'function')) {
        return (target: any) => {
            return target;
        }
    }
}