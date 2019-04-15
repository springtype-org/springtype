import {Element, Lifecycle, UseElement, ActiveRenderer} from "@springtype/springtype-incubator-core";
import {Translate, Translations} from "@springtype/springtype-incubator-i18n";

import * as englishTranslations from "./translation/en.json";
import * as germanTranslations from "./translation/de.json";
import {ActiveRoute} from "@springtype/springtype-incubator-router";

interface NotFoundPageTranslationValues {
    siteUrl?: string;
}

@Translations('de', germanTranslations)
@Translations('en', englishTranslations)
@Element('app-not-found-page')
@UseElement(Translate)
export class NotFoundPage extends HTMLElement implements Lifecycle {

    constructor(private activeRoute: ActiveRoute) {
        super();
    }

    render() {
        return <st-t key="page_not_found" values={{ siteUrl: document.location.hash } as NotFoundPageTranslationValues} />;
    }
}