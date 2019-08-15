import i18next from 'i18next';

export const i18n = i18next;
const translate = i18next.t.bind(i18next);

export const t = (key: string | string[],
                  options?: any): string => {
    return translate(key, options);
};