import { DOM_KEYS} from "../constants/dom-keys";

const defaultHtml = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';

export const registerJSDOM = (html: any = null, options: any = {}) => {

    // @ts-ignore
    if (typeof window !== 'undefined') return;

    console.log('Browser window object not found, continuing with JSDOM implementation.');

    const _global =  (<any>global);

    if (html === null) {
        html = defaultHtml
    }

    // idempotency
    if ( _global.navigator &&
        _global.navigator.userAgent &&
        _global.navigator.userAgent.indexOf('Node.js') > -1 &&
        _global.document &&
        typeof _global.document.destroy === 'function') {

        return _global.document.destroy
    }

    // JSDOM patched with support for web component API (custom elements etc.)
    const jsdom = require('@tbranyen/jsdom');
    const document = new jsdom.JSDOM(html, options);
    const window = document.window;

    DOM_KEYS.forEach((key) => {
        _global[key] = window[key];
    });

    _global.document = window.document;
    _global.window = window;

    const cleanup = () => {
        DOM_KEYS.forEach((key) => { delete _global[key] });
    };

    window.console = global.console;
    document.destroy = cleanup;

    return cleanup;
};