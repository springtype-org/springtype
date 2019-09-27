import { st } from "../st/st";
import { Ii18n, ITranslation, ITranslationValues } from "./interface/ii18n";

if (!st.i18n) {
  st.i18n = {
    valueInterpolationRegexp: /{{(.+?)}}/g,

    formatters: {},

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
            st.warn(`The translation found for key "${key}" in translations for language: ${st.i18n.currentLanguage} is an object not a string!`);
            return `t(${st.i18n.currentLanguage}/${key}) object ❓`;
          }
          return translation;
        } else {
          return walk(translation, ++i);
        }
      };
      return walk(translationJSON, 0);
    },

    applyValuesAndFormatters: (translation: string, values: ITranslationValues): string => {
      const matches: Array<string> | null = translation.match(st.i18n.valueInterpolationRegexp);

      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          const valueNameAndFormatterName = match
            .replace("{{", "")
            .replace("}}", "")
            .replace(/ /g, "")
            .split(",");
          const valueName = valueNameAndFormatterName[0];
          const formatterName = valueNameAndFormatterName[1];
          let value;

          if (valueName && values[valueName]) {
            value = values[valueName];

            if (formatterName) {
              if (typeof st.i18n.formatters[formatterName] == "function") {
                value = st.i18n.formatters[formatterName](value);
              } else {
                st.warn(`The formatter ${formatterName} for translation value {{ ${valueName}, ${formatterName} }} wasn't found!`);
              }
            }
          } else {
            st.warn(`The translation value {{ ${valueName} }} is not set in translation values!`);
            value = `? ${valueName} ?`;
          }
          translation = translation.replace(match, value);
        }
      }
      return translation;
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
      // TODO: Parse key for :, call formatter functions
      // TODO: Apply all values
      let translation = st.i18n.resolve(key, st.i18n.translations[st.i18n.currentLanguage]);

      if (!translation) {
        st.warn(`No translation found for key "${key}" in translations for language: ${st.i18n.currentLanguage}!`);
        return `? t(${st.i18n.currentLanguage}/${key}) ?`;
      } else {
        return st.i18n.applyValuesAndFormatters(translation, values || {});
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
    },

    addFormatter: (identifier: string, formatter: Function): Ii18n => {
      st.i18n.formatters[identifier] = formatter;
      return st.i18n;
    },
  };
  st.t = st.i18n.t;
}
