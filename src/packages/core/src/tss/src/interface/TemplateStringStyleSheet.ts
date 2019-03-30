export interface TemplateStringStyleSheet {
    [selectorOrMediaQuery: string]: string|TemplateStringStyleSheet;
}
