import {
    UseElement,
    Element,
    WebComponentLifecycle, Style
} from "@springtype/springtype-incubator-core";
import {Logo} from "../logo/Logo";
import {t} from "../../../../../src/package/i18n";

@Element('app-layout')
@Style((view: AppLayout) => ({
    '.copyright-footer': {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column'
    }
}))
@UseElement(Logo)
export class AppLayout extends HTMLElement implements WebComponentLifecycle {

    onLogoClick(logo: Logo) {

        console.log('onLogoClick', logo);
    }

    onSetGerman = () => {

        console.log('German language set');
    };
    
    onSetEnglish = () => {

        console.log('German language set');
    };

    render() {

        return <st-fragment>
            <div style="text-align: center;">
                <app-logo onclick={this.onLogoClick} />
            </div>
            <st-slot name="children">
                Did you forget to provide some CDATA content in the component that uses {"<app-layout>"}?
            </st-slot>

            <div>
                <a className="waves-effect waves-light btn"
                   onclick={this.onSetGerman}>{t('german')}</a>

                <a className="waves-effect waves-light btn"
                   onClick={this.onSetEnglish}>{t('english')}</a>
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