import {Component} from "@springtype/springtype-incubator-core";
import i18next from "i18next";
import {LanguageChangedHandler} from "./interface/LanguageChangedHandler";

@Component
export class Translator {

    async setLanguage(language: string): Promise<void> {
        return new Promise((resolve) => {
            i18next.changeLanguage(language, resolve);
        });
    }

    async isInitialized(): Promise<void> {

        return new Promise((resolve) => {
            i18next.init({}, resolve);
        });
    }

    onLanguageChanged(eventHandler: LanguageChangedHandler) {
        i18next.on('languageChanged', eventHandler);
    }

    get i18next() {
        return i18next;
    }
}