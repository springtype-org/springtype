export interface LanguageDetectorOptions {
    /**
     * order and from where user language should be detected
     */
    order?: Array<"querystring" | "cookie" | "localStorage" | "navigator" | "htmlTag" | string>;

    /**
     * keys or params to lookup language from
     */
    lookupQuerystring?: string;
    lookupCookie?: string;
    lookupLocalStorage?: string;

    /**
     * cache user language on
     */
    caches?: string[];

    /**
     * languages to not persist (cookie, localStorage)
     */
    excludeCacheFor?: string[];

    /**
     * optional expire and domain for set cookie
     * @default 10
     */
    cookieMinutes?: number;
    cookieDomain?: string;

    /**
     * optional htmlTag with lang attribute
     * @default document.documentElement
     */
    htmlTag?: HTMLElement | null;
}