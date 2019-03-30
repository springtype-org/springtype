export interface TranslationCatalog {

    // key -> translation message or sub-catalog
    [key: string]: string|TranslationCatalog;
}