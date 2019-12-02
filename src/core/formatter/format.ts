import { st } from "../st/st";
import { TYPE_FUNCTION } from "../lang/type-function";
import { IFormatValues } from "./interface/iformat-values";
import { IFormatter } from "./interface/iformatter";
import { IFormatterFunction } from "./interface/iformatter-function";

// for st.enable(formatter, ...)
export const formatter = null;

if (!st.formatter) {
  st.formatter = {

    valueInterpolationRegexp: /{{(.+?)}}/g,

    formatters: {},

    format: (text: string, values: IFormatValues): string => {

      const matches: Array<string> | null = text.match(st.formatter.valueInterpolationRegexp);

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
              if (typeof st.formatter.formatters[formatterName] == TYPE_FUNCTION) {
                value = st.formatter.formatters[formatterName](value);
              } else {

                if (process.env.NODE_ENV === 'development') {
                  st.warn(`The formatter ${formatterName} for translation value {{ ${valueName}, ${formatterName} }} wasn't found!`);
                }
              }
            }
          } else {

            if (process.env.NODE_ENV === 'development') {

              if (process.env.NODE_ENV === 'development') {
                st.warn(`The translation value {{ ${valueName} }} is not set in translation values!`);
              }
            }
            value = `? ${valueName} ?`;
          }
          text = text.replace(match, value);
        }
      }
      return text;
    },

    addFormatter: (identifier: string, formatter: IFormatterFunction): IFormatter => {
      st.formatter.formatters[identifier] = formatter;
      return st.formatter;
    },
  };

  st.format = st.formatter.format;
  st.addFormatter = st.formatter.addFormatter;
} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module formatter is loaded twice. Check for duplicate famework import!');
  }
}

