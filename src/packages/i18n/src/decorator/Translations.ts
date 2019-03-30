import {TranslationCatalog} from "../interface/TranslationCatalog";
import i18next from "i18next";
import {DEFAULT_NAMESPACE} from "../defaults";
import {Translation} from "./Translation";

export function Translations(locale: string, catalog: TranslationCatalog, namespace: string = DEFAULT_NAMESPACE): any {

    // called with @Translations({})
    if (!(typeof catalog === 'function')) {

        return (target: any) => {

            if (!i18next.isInitialized) {

                Translation(undefined, undefined, () => {
                    i18next.addResourceBundle(locale, namespace, catalog, true, true);
                });

            } else {
                i18next.addResourceBundle(locale, namespace, catalog, true, true);
            }
            return target;
        }
    }
}