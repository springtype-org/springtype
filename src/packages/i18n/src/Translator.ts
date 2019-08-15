import {Component} from "@springtype/core";
import i18next from "i18next";
import {LanguageChangedHandler} from "./interface/LanguageChangedHandler";

@Component
export class Translator {

    async changeLanguage(language: string): Promise<void> {
        return new Promise((resolve) => {
            i18next.changeLanguage(language, resolve);
        });
    }

    async isInitialized(): Promise<void> {

        return new Promise((resolve) => {
            i18next.init({}, resolve);
        });
    }

    getActiveLanguage(): string {
        return i18next.language;
    }

    onLanguageChanged(eventHandler: LanguageChangedHandler) {
        i18next.on('languageChanged', eventHandler);
    }

    get i18next() {
        return i18next;
    }
}