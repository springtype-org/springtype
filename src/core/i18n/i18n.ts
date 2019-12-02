import { st } from "../st/st";
import { Ii18n } from "./interface/ii18n";
import { ITranslation } from "./interface/itranslation";
import { ITranslationValues } from "./interface/itranslation-values";

// for st.enable(i18n, ...)
export const i18n = null;

if (!st.i18n) {
  st.i18n = {

    translations: {},

    currentLanguage: "en_US",

    /**
     * Resolves a translation key deep in a translation object
     * @param key Translation key such as: "module_a.foo"
     * @param translationJSON Translation JSON object data like: { "module_a": { "foo": "Foo!"} }
     */
    resolve: (key: string, translationJSON: ITranslation): string => {
      const splits = key.split(".");
      let translation;

      const walk = (translationJSONSubTree: any, i: number): any => {
        if (!translationJSONSubTree) return;

        translation = translationJSONSubTree[splits[i]];

        if (translation && i == splits.length - 1) {
          if (typeof translation != "string") {

            if (process.env.NODE_ENV === 'development') {
              st.warn(`The translation found for key "${key}" in translations for language: ${st.i18n.currentLanguage} is an object not a string!`);
            }
            return `t(${st.i18n.currentLanguage}/${key}) object ❓`;
          }
          return translation;
        } else {
          return walk(translation, ++i);
        }
      };
      return walk(translationJSON, 0);
    },

    /**
     * Translates a key to the translation by:
     * 1. resolving the translation value in the translation JSON data for the currently active language
     * 2. Applying translation values for wildcards
     * 3. Applying transformator functions for the values
     * @param key Translation key
     * @param [values] An optional object of data values to replace wildcards with
     */
    t: (key: string, values?: ITranslationValues): string => {
      let translation = st.i18n.resolve(key, st.i18n.translations[st.i18n.currentLanguage]);

      if (!translation) {

        if (process.env.NODE_ENV === 'development') {
          st.warn(`No translation found for key "${key}" in translations for language: ${st.i18n.currentLanguage}!`);
        }
        return `? t(${st.i18n.currentLanguage}/${key}) ?`;
      } else {
        return st.format(translation, values || {});
      }
    },

    addTranslation: (language: string, translation: ITranslation): Ii18n => {
      st.i18n.initLanguage(language);

      st.i18n.translations[language] = {
        ...st.i18n.translations[language],
        ...translation,
      };
      return st.i18n;
    },

    initLanguage: (language: string): void => {
      if (!st.i18n.translations[language]) {
        st.i18n.translations[language] = {};
      }
    },

    setLanguage: (language: string): Ii18n => {
      st.i18n.initLanguage(language);
      st.i18n.currentLanguage = language;
      return st.i18n;
    }
  };

  // functional API
  st.t = st.i18n.t;
  st.setLanguage = st.i18n.setLanguage;
  st.addTranslation = st.i18n.addTranslation;

} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module i18n is loaded twice. Check for duplicate famework import!');
  }
}
