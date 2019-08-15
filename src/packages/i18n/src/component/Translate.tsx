import {Attribute, WebComponent, Lifecycle, Partial} from "@springtype/core";
import {t} from "../i18nextAdaper";
import {TOptions} from "i18next";

@WebComponent('st-t')
export class Translate extends HTMLElement implements Lifecycle {

    @Attribute
    key: string;

    @Attribute
    values?: object;

    @Attribute
    options?: TOptions;

    cachedTranslation: string;

    onBeforeRender() {

        if (!this.cachedTranslation) {
            this.cachedTranslation = t(this.key, {...this.values || {}, ...this.options || {}});
        }
    }

    render() {
        return this.cachedTranslation;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-t': Partial<Translate>;
        }
    }
}