export class HtmlContext {

    protected static defaultInstance: HtmlContext = new HtmlContext();

    static getInstance(): HtmlContext {
        return HtmlContext.defaultInstance;
    }
}