import {Element, Lifecycle, Style, UseElement, Partial, ActiveRenderer} from "@springtype/core";
import {t, Translator} from "@springtype/i18n";
import {Logo} from "../logo/Logo";
import {ActiveRoute} from "@springtype/router";

@Element('app-layout')
@Style((view: AppLayout) => ({
    '.copyright-footer': {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column'
    }
}))
@UseElement(Logo)
export class AppLayout extends HTMLElement implements Lifecycle {

    constructor(protected translator: Translator,
                protected activeRoute: ActiveRoute) {

        super();
    }

    onLogoClick(evt: Event) {

        console.log('onLogoClick', evt);
    }

    setLanguage = (language: string) => {

        if (this.translator.getActiveLanguage() !== language) {

            this.translator.changeLanguage(language);
            this.activeRoute.refresh();
        }
    };

    render() {

        return <st-fragment>
            <div style="margin-top: 20px; text-align: center">
                <app-logo onclick={this.onLogoClick} />
            </div>
            <st-slot name="children">
                Did you forget to provide some CDATA content in the component that uses {"<app-layout>"}?
            </st-slot>
 
            <div style="margin-top: 20px">
                <a className="waves-effect waves-light btn"
                   onclick={() => this.setLanguage('de')}>{t('german')}</a>

                <a className="waves-effect waves-light btn"
                   onclick={() => this.setLanguage('en')}>{t('english')}</a>
            </div>

            <st-slot class="copyright-footer" name="copyright">
                <st-t key="copyright.firstLine" />
                <br />
                <st-t key="copyright.secondLine" values={{
                    buildDate: new Date(),
                    branch: 'master'
                }} />
            </st-slot>
        </st-fragment>;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-layout': Partial<AppLayout>;
        }
    }
}