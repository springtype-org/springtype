import {Component} from "@springtype/springtype-incubator-core";
import i18next from "i18next";

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

    get i18next(): i18next {
        return i18next;
    }
}